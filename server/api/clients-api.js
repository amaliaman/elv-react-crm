const express = require('express');
const router = express.Router();

const Client = require('../../models/clientModel');

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
        // .then(clientNames => console.log(clientNames))
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

module.exports = router;