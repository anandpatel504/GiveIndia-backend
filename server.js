const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const mydate = require('current-date');
const fs = require("fs");
const CircularJSON = require('circular-json')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv=require('csvtojson');

app.use(bodyParser.json());

// route to donation_data.js
var donation_data = express.Router();
app.use("/", donation_data);
require("./Routes/donation_data")(donation_data, axios, mydate, createCsvWriter)

// route to donation_amount.js
var donation_amount = express.Router();
app.use("/", donation_amount);
require("./Routes/donation_amount")(donation_amount, axios, csv);

// route to noneprofit.js
var noneprofit = express.Router();
app.use("/", noneprofit);
require("./Routes/noneprofit")(noneprofit, axios, csv, createCsvWriter)

// the port listener
const server = app.listen(5051, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("server is running on port.......");
  console.log(host, port);
});
