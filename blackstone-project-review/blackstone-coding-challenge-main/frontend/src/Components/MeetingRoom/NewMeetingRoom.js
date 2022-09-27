import React, { useState, useEffect } from "react";
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../../styles/newMeetingRoomStyles.css";
export default function NewMeetingRoom(props) {
  const [formInput, setFormInput] = useState({
    meeting_room_id: null,
    name: "",
    capacity: 1,
    floor: 1,
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const floors = [];

  for (let i = 1; i <= 100; i++) {
    floors.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      meeting_room_id: Math.ceil(Math.random() * 10000),
    }));
  }, []);

  const handleRouteChange = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = formInput;
    axios
      .post("http://localhost:3001/api/meeting-rooms", {
        data,
      })
      .then((res) => {
        setMessage(res.data.status);
      })
      .catch((err) => {
        setMessage("Something went wrong :(");
      });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      {message === "" ? (
        <Paper id="new-meeting-room-conatiner">
          {" "}
          <h1>{"Create a Meeting Room"}</h1>
          <form onSubmit={handleSubmit} id="form-container">
            <TextField
              required
              label="name"
              name="name"
              className="input-field"
              helperText="Enter Meeting Room name"
              onChange={handleInput}
            />
            <TextField
              required
              label="capacity"
              type="number"
              name="capacity"
              className="input-field"
              helperText="e.g. 2"
              onChange={handleInput}
            />
            <InputLabel id="demo-simple-select-label">Floor</InputLabel>
            <Select
              required
              style={{ minWidth: 120 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formInput.floor}
              className="input-field"
              name="floor"
              onChange={handleInput}
            >
              {floors.map((ele) => ele)}
            </Select>
            <Button type="submit" variant="contained" color="primary">
              Create new meeting room
            </Button>
          </form>
        </Paper>
      ) : (
        <div className="adjust-width">
          <h1>{message}</h1>
          <button onClick={handleRouteChange}>Home</button>
        </div>
      )}
    </div>
  );
}
