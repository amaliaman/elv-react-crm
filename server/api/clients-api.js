const express = require('express');
const router = express.Router();

// Get all clients
router.get('/clients', (req, res) => {
   // Simulate API call, later replace with DB call
    setTimeout(() => {
        let data = require('../data.json');
        res.json(data);
    }, 1000);
});

module.exports = router;