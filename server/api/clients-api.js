const express = require('express');
const router = express.Router();
const moment = require('moment');

const Client = require('../../models/clientModel');

// ===== Main CRUD =====
// Get all clients
router.get('/clients', (req, res) => {
    Client
        .find()
        .then(clients => res.json(clients))
        .catch(err => { throw err });
});

// Get paged clients
router.get('/clientspaged/:start', (req, res) => {
    const { start } = req.params;
    const pageSize = 20;

    Client
        .countDocuments()
        .then(count => {
            Client
                .find()
                .skip(Number(start))
                .limit(pageSize)
                .then(clients => res.json({
                    firstResult: Number(start),
                    lastResult: Number(start) + clients.length - 1,
                    pageSize: pageSize,
                    totalItems: count,
                    data: clients
                }))
                .catch(err => { throw err });
        })
        .catch(err => { throw err });


});

// Get all owners
router.get('/owners', (req, res) => {
    Client
        .distinct('owner')
        .then(owners => res.json(owners))
        .catch(err => { throw err });
});

// Get an array of all client names & IDs
router.get('/clientnames', (req, res) => {
    Client
        .find()
        .select('name')
        .then(clientNames => res.json(clientNames))
        .catch(err => { throw err });
});

// Get a client by its ID
router.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    Client
        .findById(id)
        .select('emailType owner sold')
        .then(client => res.json(client))
        .catch(err => { throw err });
});

// Add a client
router.post('/clients', (req, res) => {
    const { name, country, owner } = req.body;
    console.log(name)
    const client = new Client({
        name: name,
        country: country,
        owner: owner
    });
    client
        .save()
        .then(client => res.status(201).json(client))
        .catch(err => { throw err });
});

// Update a client
router.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Client
        .findByIdAndUpdate(id, update, { new: true })
        .then(client => res.status(201).json(client))
        .catch(err => { throw err });
});

// ===== Badges queries =====
// New clients this month
router.get('/analytics/new', (req, res) => {
    const year = moment().year();
    const month = moment().month();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    Client
        .countDocuments({ "firstContact": { "$gte": firstDay, "$lte": lastDay } })
        .then(count => res.json(count))
        .catch(err => { throw err });
});

// Emails sent
router.get('/analytics/emails', (req, res) => {
    Client
        .countDocuments({ 'emailType': { '$exists': true, '$ne': null } })
        .then(count => res.json(count))
        .catch(err => { throw err });
});

// Outstanding clients
router.get('/analytics/outstanding', (req, res) => {
    Client
        .countDocuments({ 'sold': { '$exists': true, '$eq': false } })
        .then(count => res.json(count))
        .catch(err => { throw err });
});

// Hottest country
router.get('/analytics/country', (req, res) => {
    Client
        .aggregate([
            { $match: { sold: { '$eq': true } } },
            { $group: { _id: "$country", count: { $sum: 1 } } }
        ])
        .then(data => {
            const max = data.sort((a, b) => a.count < b.count)[0]._id;
            res.send(max);
        })
        .catch(err => { throw err });
});

// ===== Charts queries =====
// Top employees
router.get('/analytics/topemployees', (req, res) => {
    Client
        .aggregate([
            { $match: { sold: { '$eq': true } } },
            { $group: { _id: "$owner", sold: { $sum: 1 } } }
        ])
        .then(data => {
            const top = data
                .sort((a, b) => a.sold < b.sold)
                .slice(0, 3);
            res.json(top);
        })
        .catch(err => { throw err });
});

// Sales by dynamic param
router.get('/analytics/sales/:by', (req, res) => {
    const { by } = req.params;
    let selectBy = `$${by}`;

    if (by !== 'firstContact') {
        Client
            .aggregate([
                { $match: { sold: { '$eq': true } } },
                { $group: { _id: selectBy, sold: { $sum: 1 } } }
            ])
            .then(data => {
                data.sort((a, b) => a._id > b._id);
                res.json(data);
            })
            .catch(err => { throw err });
    }
    else {
        Client
            .aggregate([
                { $match: { sold: { '$eq': true } } },
                { $project: { month: { $month: selectBy }, } },
                { $group: { _id: { month: '$month' }, sold: { $sum: 1 } } }
            ])
            .then(data => {
                const months = data
                    .sort((a, b) => a._id.month - b._id.month)
                    .map(m => { return { _id: moment(m._id.month, 'M').format('MMM'), sold: m.sold } })
                res.json(months);
            })
            .catch(err => { throw err });
    }
});

// Sales since given date (count of sales per firstContact - doesn't reflect actual sales )
router.get('/analytics/since/:date', (req, res) => {
    const { date } = req.params;
    const since = new Date(date);
    const now = new Date();

    Client
        .aggregate([
            { $match: { firstContact: { $gte: since, $lte: now }, sold: { '$eq': true } } },
            { $group: { _id: '$firstContact', sales: { $sum: 1 } } }
        ])
        .then(data => {
            data
                .sort((a, b) => a._id - b._id)
                .forEach(d => d._id = moment(d._id).format('YYYY-MM-DD'));
            res.json(data)
        })
        .catch(err => { throw err });
});

// Client acquisition by month
router.get('/analytics/acquisition', (req, res) => {
    // Hard-coded values for demo
    const acquisitionData = [
        { month: '6-12 Months', clients: 131 },
        { month: '> 12 Months', clients: 302 },
        { month: 'Last Month', clients: 22 }
    ];
    res.json(acquisitionData);
});

module.exports = router;