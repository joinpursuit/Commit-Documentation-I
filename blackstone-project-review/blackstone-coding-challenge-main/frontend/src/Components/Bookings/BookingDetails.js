import React, { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import "../../styles/bookingDetailsStyles.css";

const BookingDetails = (props) => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [cancel, setCancel] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/bookings/:id`, {
        params: { id: location.state.id },
      })
      .then((res) => {
        console.log(res.data);
        setBookingDetails(res.data.data);
      });
  }, []);

  const handleCancelBooking = (e) => {
    if (e.target.name === "cancel") {
      axios
        .delete("/api/bookings/:id", { params: { id: location.state.id } })
        .then((res) => {
          setMessage(res.data.message);
        })
        .catch((err) => setMessage(err));
    } else if (e.target.name === "no") {
      setCancel(false);
    } else {
      setCancel(true);
    }
  };

  const handleRouteChange = () => {
    navigate("/");
  };

  if (message === "") {
    return (
      <div id="booking-details-container">
        <BookingCard
          meeting_name={bookingDetails.meeting_name}
          name={location.state.name}
          start_time={location.state.start_time}
          end_time={location.state.end_time}
          floor={location.state.floor}
        />
        {cancel ? (
          <div>
            <h1>Are you sure you want to cancel?</h1>
            <button name={"cancel"} onClick={handleCancelBooking}>
              Cancel Booking
            </button>{" "}
            <button name={"no"} onClick={handleCancelBooking}>
              No
            </button>
          </div>
        ) : (
          <button name={""} onClick={handleCancelBooking}>
            cancel
          </button>
        )}
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

export default BookingDetails;
