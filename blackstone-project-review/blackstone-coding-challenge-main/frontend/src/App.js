import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import axios from "axios";

// Import components
import NavBar from "./Components/Nav";
import Home from "./Components/Home";
import MeetingRoomBooking from "./Components/MeetingRoom/MeetingRoomBooking";
import NewMeetingRoom from "./Components/MeetingRoom/NewMeetingRoom";
import MeetingRooms from "./Components/MeetingRoom/MeetingRooms";
import Bookings from "./Components/Bookings/Bookings";
import BookingDetails from "./Components/Bookings/BookingDetails";

class App extends Component {
  constructor() {
    super();
    this.state = {
      meetingRooms: [],
      filteredMeetingRooms: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/meeting-rooms")
      .then((res) => {
        this.setState({ meetingRooms: res.data.meeting_rooms });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findMeetingRooms = (e, formInput) => {
    e.preventDefault();
    axios
      .get("/api/findMeetingRooms", {
        params: {
          start_time: formInput.start_time,
          end_time: formInput.end_time,
          capacity: formInput.capacity,
          floor: formInput.floor,
        },
      })
      .then((res) => {
        if (res.data.data.length) {
          this.setState({
            filteredMeetingRooms: res.data.data,
          });
        } else {
          this.setState({
            message: "No rooms available",
          });
        }
      });
  };

  handleHomePage = () => {
    const { meetingRooms, filteredMeetingRooms } = this.state;
    return (
      <Home
        meetingRooms={meetingRooms}
        filteredMeetingRooms={filteredMeetingRooms}
        findMeetingRooms={this.findMeetingRooms}
        message={this.state.message}
      />
    );
  };

  handleMeetingRoomsPage = () => {
    const { meetingRooms } = this.state;
    return <MeetingRooms meetingRooms={meetingRooms} />;
  };

  handleMeetingRoomBookingPage = () => {
    return <MeetingRoomBooking />;
  };

  handleNewMeetingRoomsPage = () => {
    return <NewMeetingRoom />;
  };

  handleBookingsPage = () => {
    const { meetingRooms } = this.state;
    return <Bookings meetingRooms={meetingRooms} />;
  };
  handleBookingDetailsPage = () => {
    return <BookingDetails />;
  };

  render() {
    return (
      <div id="app-container">
        <NavBar></NavBar>
        <Routes>
          <Route path="meetingrooms/" element={this.handleMeetingRoomsPage()} />
          <Route
            path="meetingrooms/:id"
            element={this.handleMeetingRoomBookingPage()}
          />
          <Route
            path="meetingrooms/new"
            element={this.handleNewMeetingRoomsPage()}
          />
          <Route path="bookings" element={this.handleBookingsPage()} />
          <Route
            path="bookings/:id"
            element={this.handleBookingDetailsPage()}
          />
          <Route path="/" element={this.handleHomePage()} />
        </Routes>
      </div>
    );
  }
}
export default App;
