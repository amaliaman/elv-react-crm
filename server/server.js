const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const moment = require('moment');

const clientsApi = require("./api/clients-api");

const SERVER_PORT = process.env.PORT || 8080;

// Cross-origin request handling
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next();
});

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", clientsApi);

// Error handling
app.use(function (req, res) {
  res.status(404).send('Page not found (404)');
});
app.use(function (error, req, res, next) {
  res.status(500).send('An error has occured (500)');
});

app.listen(SERVER_PORT, () => { console.log(`${getTimestamp()} - Server started on port ${SERVER_PORT}`) });

function getTimestamp() { return moment().format("YYYY-MM-DD HH:mm:ss") }