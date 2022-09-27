import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingCard from "./BookingCard";
import moment from "moment";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/bookings")
      .then((res) => {
        setBookings(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {bookings.map((reservedTime, i) => (
        <div>
          <BookingCard
            key={i}
            booking_id={reservedTime.booking_id}
            name={reservedTime.name}
            meeting_name={reservedTime.meeting_name}
            start_time={moment
              .utc(reservedTime.start_time)
              .local()
              .format("YYYY/MM/DDTHH:mm:SS.sss")}
            end_time={moment
              .utc(reservedTime.end_time)
              .local()
              .format("YYYY/MM/DDTHH:mm:SS.sss")}
            floor={reservedTime.floor}
          />
        </div>
      ))}
    </div>
  );
};

export default Bookings;
