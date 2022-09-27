const db = require("./index");
const moment = require("moment");
function getMeetingRooms(req, res) {
  db.any("SELECT * FROM meeting_rooms;", {})
    .then((data) => {
      res.status(200).json({ meeting_rooms: data });
    })
    .catch((err) => {
      res.status(500).json({ message: `FAILED: getMeetingRooms` });
    });
}

function createMeetingRoom(req, res) {
  let data = req.body.data;
  db.any(
    "INSERT INTO meeting_rooms (meeting_room_id, name, capacity, floor) VALUES(${meeting_room_id" +
      "}, ${name}, ${capacity}, ${floor})",
    {
      meeting_room_id: data.meeting_room_id.toString(),
      name: data.name,
      capacity: data.capacity,
      floor: data.floor,
    }
  )
    .then(() => {
      res.status(200).json({ status: `successfully created a meeting room` });
    })
    .catch((err) => {
      res.status(500).json({ status: `failed${err}` });
    });
}

function getMeetingRoomById(req, res) {
  db.one(
    "SELECT * FROM meeting_rooms WHERE meeting_room_id=${meeting_room_id};",
    {
      meeting_room_id: req.query.id,
    }
  )
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched meeting room",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `FAILED: Meeting room does not exisit` });
    });
}

function getFutureBookings(req, res) {
  db.any(
    "SELECT * FROM bookings WHERE meeting_room_id=${meeting_room_id} and start_time >= now();",
    {
      meeting_room_id: req.query.id,
    }
  )
    .then((data) => {
      res.status(200).json({ meeting_rooms: data });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: `FAILED: Could not get future bookings` });
    });
}

function getBookings(req, res) {
  db.any(
    "select bookings.booking_id, bookings.meeting_name, meeting_rooms.name, meeting_rooms.floor, bookings.start_time, bookings.end_time, bookings.meeting_name, bookings.attendees from bookings inner join meeting_rooms on bookings.meeting_room_id=meeting_rooms.meeting_room_id",
    {}
  )
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched all bookings",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `FAILED: Could not get all bookings` });
    });
}

function createBookingforMeetingRoom(req, res) {
  db.none(
    "INSERT INTO bookings (booking_id, meeting_room_id, start_time, end_time, meeting_name, attendees) VALUES(${booking_id}, ${meeting_room_id}, ${start_time}, ${end_time}, ${meeting_name}, ${attendees});",
    {
      booking_id: req.body.booking_id,
      meeting_room_id: req.body.meeting_room_id,
      start_time: moment
        .utc(req.body.start_time)
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      end_time: moment
        .utc(req.body.end_time)
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      meeting_name: req.body.meeting_name,
      attendees: req.body.attendees,
    }
  )
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "Room Booked",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `FAILED: Could not book room` });
    });
}

function getBookingById(req, res) {
  db.one("SELECT * FROM bookings WHERE booking_id=${booking_id};", {
    booking_id: req.query.id,
  })
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Fetched booking",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `FAILED: Could not get booking` });
    });
}

function deleteBooking(req, res) {
  db.none("delete from bookings where booking_id=${booking_id};", {
    booking_id: req.query.id,
  })
    .then((data) => {
      res.status(200).json({
        status: "success",
        message: "Successfully canceled a booking",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `FAILED: Could not cancel booking` });
    });
}

function findAvaiableRooms(req, res) {
  console.log(parseInt(req.query.floor));
  db.any(
    "with booked_rooms as (select distinct meeting_room_id from bookings where ${start_time} between start_time and end_time or ${end_time} between start_time and end_time) select * from meeting_rooms where meeting_room_id not in (select * from booked_rooms) and capacity >= ${capacity} and floor = ${floor}",
    {
      start_time: moment
        .utc(req.query.start_time)
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      end_time: moment
        .utc(req.query.end_time)
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      capacity: parseInt(req.query.capacity),
      floor: parseInt(req.query.floor),
    }
  )
    .then((data) => {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Found available meeting rooms",
      });
    })
    .catch((err) => {
      res.status(500).json({ message: `Couldn't find any meeting rooms` });
    });
}

module.exports = {
  getMeetingRooms,
  createMeetingRoom,
  getMeetingRoomById,
  getFutureBookings,
  getBookings,
  getBookingById,
  createBookingforMeetingRoom,
  deleteBooking,
  findAvaiableRooms,
};
