var express = require("express");
var router = express.Router();
const db = require("../db/queries");

/* GET home page. */
router.get("/", function (req, res) {
  res.json({ message: "hi" });
});

router.get("/api/meeting-rooms", db.getMeetingRooms); //gets all meeting rooms
router.post("/api/meeting-rooms", db.createMeetingRoom); //creates meeting rooms
router.get("/api/meeting-rooms/:id", db.getMeetingRoomById); //gets meeting room by id
router.get("/api/meeting-rooms/:id/bookings", db.getFutureBookings); //gets all future bookings of a meeting room
router.get("/api/bookings/", db.getBookings); //gets all bookings
router.get("/api/bookings/:id", db.getBookingById); //creates a booking for a meeting room
router.post("/api/bookings", db.createBookingforMeetingRoom); //creates a booking for a meeting room
router.delete("/api/bookings/:id", db.deleteBooking); //cancel a booking
router.get("/api/findMeetingRooms", db.findAvaiableRooms); //finds available meeting rooms

module.exports = router;
