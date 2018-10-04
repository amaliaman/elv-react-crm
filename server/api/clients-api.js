const express = require('express');
const router = express.Router();
const moment = require('moment');

const Client = require('../../models/clientModel');

// ===== Main CRUD =====
// Get all clients
router.get('/clients', (req, res) => {
    Client.find()
        .then(clients => res.json(clients))
        .catch(err => { throw err });
});

// Get all owners
router.get('/owners', (req, res) => {
    Client.distinct('owner')
        .then(owners => res.json(owners))
        .catch(err => { throw err });
});

// Get an array of all client names & IDs
router.get('/clientnames', (req, res) => {
    Client.find()
        .select('name')
        .then(clientNames => res.json(clientNames))
        .catch(err => { throw err });
});

// Get a client by its ID
router.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    Client.findById(id)
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
    client.save()
        .then(client => res.status(201).json(client))
        .catch(err => { throw err });
});

// Update a client
router.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    Client.findByIdAndUpdate(id, update, { new: true })
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
    Client.countDocuments({ "firstContact": { "$gte": firstDay, "$lte": lastDay } })
        .then(count => res.json(count))
        .catch(err => { throw err });
});

// Emails sent
router.get('/analytics/emails', (req, res) => {
    Client.countDocuments({ 'emailType': { '$exists': true, '$ne': null } })
        .then(count => res.json(count))
        .catch(err => { throw err });
});

// Outstanding clients
router.get('/analytics/outstanding', (req, res) => {
    Client.countDocuments({ 'sold': { '$exists': true, '$eq': false } })
        .then(count => res.json(count))
        .catch(err => { throw err });
});

// Hottest country
router.get('/analytics/country', (req, res) => {
    Client.aggregate([
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
    Client.aggregate([
        { $match: { sold: { '$eq': true } } },
        { $group: { _id: "$owner", sold: { $sum: 1 } } }
    ])
        .then(data => {
            data
                .sort((a, b) => a.sold < b.sold)
                .slice(0, 3);
            res.json(data);
        })
        .catch(err => { throw err });
});

// Sales by country
router.get('/analytics/salescountry', (req, res) => {
    Client.aggregate([
        { $match: { sold: { '$eq': true } } },
        { $group: { _id: "$country", sold: { $sum: 1 } } }
    ])
        .then(data => {
            data.sort((a, b) => a._id > b._id);
            res.json(data);
        })
        .catch(err => { throw err });
});

// Sales last 30 days
router.get('/analytics/lastmonth', (req, res) => {
    const lastMonth = moment().subtract(30, 'days');
    Client.aggregate([
        { $match: { firstContact: { $gte: new Date(lastMonth), $lte: new Date() } } },
        {
            $project:
            {
                firstContact: 1,
                sale: { $cond: { if: { $eq: ["$sold", true] }, then: 1, else: 0 } }
            }
        },
        { $group: { _id: "$firstContact", sales: { $sum: '$sale' } } }
    ])
        .then(data => {
            data.sort((a, b) => a._id > b._id);
            res.json(data)
        })
        .catch(err => { throw err });
});

module.exports = router;