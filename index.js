const fs = require("fs");
const path = require("path");
const moment = require("moment");
const express = require('express');

const config = require("./config.json")
const GoogleMapsApi = require("./GoogleMapsApi");

const app = express();
const PORT_NUMBER = config.PORT;
const http = require('http').Server(app);

// Configure Express

const googleMaps = new GoogleMapsApi();

// Middleware to log requests
app.use("/", async (req, res, next) => {
  console.log(moment().format("MM/DD/YYYY HH:mm:ss"), "REQUEST", req.originalUrl);
  next();
});


// Configure Routing
app.get('/', (req, res) => {
  return res.send("GoogleMaps API Microservice is up.");
});

app.get('/geocode', async (req, res) => {
  const query = req.query.query;
  return res.send(
    await googleMaps.getGeocode(query)
  );
});

// Express-Server Start Up
http.listen(PORT_NUMBER, async () => {
  console.log(`listening on *:${PORT_NUMBER}`);
});