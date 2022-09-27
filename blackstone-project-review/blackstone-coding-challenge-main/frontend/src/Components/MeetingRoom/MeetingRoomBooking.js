import React, { useEffect, useState } from "react";
import MeetingRoomDetails from "./MeetingRoomDetails";
import axios from "axios";
import { useLocation } from "react-router-dom";
import StartAndEndTimes from "../StartAndEndTimes";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "../../styles/meetingRoomBookingStyles.css";

const MeetingRoom = (props) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [meetingRoomDetails, setMeetingRoomDetails] = useState({});
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [start_time, setStartTime] = React.useState(new Date());
  const [end_time, setEndTime] = React.useState(new Date());
  const [formInput, setFormInput] = useState({
    name: "",
    attendees: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const getMeetingRoomById = await axios(`/api/meeting-rooms/:id`, {
        params: { id: location.state.id },
      });
      const getBookingsForMeetingRoom = await axios(
        `/api/meeting-rooms/:id/bookings`,
        {
          params: { id: location.state.id },
        }
      );

      setMeetingRoomDetails({
        meetingRoomDetails: getMeetingRoomById.data,
        bookingDetails: getBookingsForMeetingRoom.data,
      });
      setHasLoaded(true);
    };

    fetchData();
  }, []);
  console.log(meetingRoomDetails.bookingDetails);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRouteChange = () => {
    navigate("/");
  };

  const submitBooking = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/bookings", {
        booking_id: Math.ceil(Math.random() * 10000), //"unique" ID ... could be solved with more time and a better hashing function
        meeting_name: formInput.name,
        meeting_room_id: location.state.id,
        start_time: start_time,
        end_time: end_time,
        attendees: formInput.attendees,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((error) => {
        setMessage("There was an error try again later");
      });
  };

  // we can further break down this UI component to create a more maintanable code base
  if (hasLoaded && message === "") {
    return (
      <div id="meeting-room-container">
        <div>
          <MeetingRoomDetails
            meeting_room_id={
              meetingRoomDetails.meetingRoomDetails.data.meeting_room_id
            }
            name={meetingRoomDetails.meetingRoomDetails.data.name}
            capacity={meetingRoomDetails.meetingRoomDetails.data.capacity}
            floor={meetingRoomDetails.meetingRoomDetails.data.floor}
          />
        </div>
        <div className="adjust-width">
          <Paper>
            <h1>{"Book Meeting Room"}</h1>
            <form onSubmit={submitBooking} id="form-container">
              <TextField
                required
                label="name"
                name="name"
                className="input-field"
                helperText="Enter Meeting Room name"
                onChange={handleInput}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="Date&Time picker"
                  value={start_time}
                  onChange={(newValue) => {
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                  label="Date&Time picker"
                  value={end_time}
                  onChange={(newValue) => {
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <TextField
                label="Attendees"
                name="attendees"
                className="input-field"
                helperText="Enter participants attending this meeting"
                onChange={handleInput}
              />
              <Button type="submit" variant="contained" color="primary">
                Book meeting room
              </Button>
            </form>
          </Paper>
        </div>
        <div>
          {meetingRoomDetails.bookingDetails.meeting_rooms.map(
            (bookingDetails, i) => {
              return (
                <div className="adjust-width">
                  <h1>{bookingDetails.meeting_name}</h1>
                  <StartAndEndTimes
                    key={i}
                    start_time={moment
                      .utc(bookingDetails.start_time)
                      .local()
                      .format("YYYY/MM/DDTHH:mm:SS.sss")}
                    end_time={moment
                      .utc(bookingDetails.end_time)
                      .local()
                      .format("YYYY/MM/DDTHH:mm:SS.sss")}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="adjust-width">
        <h1>{message}</h1>
        <button onClick={handleRouteChange}>Home</button>
      </div>
    );
  }
};

export default MeetingRoom;
