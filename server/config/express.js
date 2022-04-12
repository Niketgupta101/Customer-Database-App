const express = require("express");
const routes = require('../api/routes/index.js');

const app = express();

const cors = require('cors');
app.use(cors());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

app.use(express.json());

app.use('/', routes);

app.use(function (req, res, next) {
    res.status(404).send("Error 404 : Page not found.");
})

module.exports = app;