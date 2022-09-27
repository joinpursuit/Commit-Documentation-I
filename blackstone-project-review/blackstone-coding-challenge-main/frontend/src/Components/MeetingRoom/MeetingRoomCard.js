import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/meetingRoomCardStyles.css";
import PeopleIcon from "@mui/icons-material/People";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

const MeetingRoomCard = (props) => {
  const history = useNavigate();
  const { name, meeting_room_id, capacity, floor } = props;
  return (
    <div
      id="meeting-room-card-container"
      onClick={() => {
        history(`/meetingrooms/${meeting_room_id}`, {
          replace: true,
          state: { id: meeting_room_id },
        });
      }}
    >
      <h1>{name}</h1>
      <div className="capacity">
        <PeopleIcon className="capacity-icon" />
        <h3>Capacity: {capacity}</h3>
      </div>
      <div className="floor">
        <CorporateFareIcon className="floor-icon" />
        <h3>Floor: {floor}</h3>
      </div>
    </div>
  );
};
export default MeetingRoomCard;
