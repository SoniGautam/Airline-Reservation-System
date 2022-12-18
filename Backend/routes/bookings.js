const { Bookings, validateBookings } = require("../models/bookings");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


router.get("/", [auth], async (req, res) => {
    const bookings = await Bookings.find()
        .select("-__v")
        .sort("date");
        
    res.send(bookings);
});


router.get("/:id", [auth, validateObjectId], async (req, res) => {
    const booking = await Bookings.findById(req.params.id).select("-__v");

    if (!booking)
        return res.status(404).send("The booking with the given ID was not found.");

    res.send(booking);
});


router.post("/", [auth], async (req, res) => {
    const { error } = validateBookings(req.body);
    if (error) return res.status(400).send(error.message);

    const booking = new Bookings({
        date: req.body.date,
        flightDate: req.body.flightDate,
        dest1: req.body.dest1,
        dest2: req.body.dest2,
        seats: req.body.seats,
        remarks: req.body.remarks,
        username: req.body.username
    });

    await booking.save();

    res.send(booking);
});


router.put("/:id", [auth], async (req, res) => {
    const { error } = validateBookings(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const booking = await Bookings.findByIdAndUpdate(
        req.params.id,
        {
            date: req.body.date,
            flightDate: req.body.flightDate,
            dest1: req.body.dest1,
            dest2: req.body.dest2,
            seats: req.body.seats,
            remarks: req.body.remarks,
            username: req.body.username
        },
        { new: true }
    );

    if (!booking)
        return res.status(404).send("The booking with the given ID was not found.");

    res.send(booking);
});


router.delete("/:id", [auth], async (req, res) => {
    const booking = await Bookings.findByIdAndRemove(req.params.id);

    if (!booking)
        return res.status(404).send("The booking with the given ID was not found.");

    res.send(booking);
});


module.exports = router;