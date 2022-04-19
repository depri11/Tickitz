const express = require("express");
const routers = express.Router();

const movies = require("./movies");
const bookings = require("./bookings");
const schedules = require("./schedules");

routers.use("/movies", movies);
routers.use("/bookings", bookings);
routers.use("/schedules", schedules);

module.exports = routers;
