const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

let clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, default: '' },
    firstContact: { type: Date, default: Date.now },
    emailType: { type: String, default: '' },
    sold: { type: Boolean, default: false },
    owner: String,
    country: String
});

let Client = mongoose.model('client', clientSchema);

module.exports = Client;