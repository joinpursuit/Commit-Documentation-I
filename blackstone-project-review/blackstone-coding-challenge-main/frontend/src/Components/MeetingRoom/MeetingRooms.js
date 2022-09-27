import React, { useEffect, useState } from "react";
import MeetingRoomCard from "./MeetingRoomCard";
import axios from "axios";

const MeetingRooms = (props) => {
  const { meetingRooms } = props;
  const [newMeetingRooms, setMeetingRooms] = useState(meetingRooms);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/meeting-rooms")
      .then((res) => {
        setMeetingRooms(res.data.meeting_rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {newMeetingRooms.map((meetingRoom) => (
        <MeetingRoomCard
          className="adjust-width"
          key={meetingRoom.meeting_room_id}
          meeting_room_id={meetingRoom.meeting_room_id}
          name={meetingRoom.name}
          capacity={meetingRoom.capacity}
          floor={meetingRoom.floor}
        />
      ))}
    </div>
  );
};

export default MeetingRooms;
