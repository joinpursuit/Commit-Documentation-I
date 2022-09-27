import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/meetingRoomDetailStyles.css";

const MeetingRoomDetails = (props) => {
  const { name, capacity, floor } = props;
  return (
    <div id="meeting-room-details-container">
      <h1>{name}</h1>
      <h3>Capacity: {capacity}</h3>
      <h3>Floor: {floor}</h3>
    </div>
  );
};
export default MeetingRoomDetails;
