import React from "react";
import StartAndEndTimes from "../StartAndEndTimes";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import { useNavigate } from "react-router-dom";

import "../../styles/bookingCardStyles.css";
const BookingCard = (props) => {
  const history = useNavigate();
  const { booking_id, name, meeting_name, start_time, end_time, floor } = props;
  return (
    <div
      id="booking-card-container"
      onClick={() => {
        history(`/bookings/${booking_id}`, {
          replace: true,
          state: {
            id: booking_id,
            name: name,
            start_time: start_time,
            end_time: end_time,
            floor: floor,
          },
        });
      }}
    >
      <h1>{meeting_name}</h1>
      <h3>{name}</h3>
      <StartAndEndTimes start_time={start_time} end_time={end_time} />
      <div className="floor">
        <CorporateFareIcon className="floor-icon" /> <h3>Floor: {floor}</h3>
      </div>
    </div>
  );
};
export default BookingCard;
