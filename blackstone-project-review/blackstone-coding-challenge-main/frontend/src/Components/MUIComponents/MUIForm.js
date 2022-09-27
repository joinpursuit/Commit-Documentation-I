import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import "../../styles/MUIFormStyles.css";

const MUIForm = ({ findMeetingRooms }) => {
  const [start_time, setStartTime] = React.useState(new Date());
  const [end_time, setEndTime] = React.useState(new Date());
  const [formInput, setFormInput] = useState({
    floor: 1,
    capacity: 1,
  });

  const floors = [];
  for (let i = 1; i <= 100; i++) {
    floors.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="adjust-width">
      <h1>{"Find Meeting Room"}</h1>
      <form
        id="form-container"
        onSubmit={(e) =>
          findMeetingRooms(e, {
            start_time: start_time,
            end_time: end_time,
            floor: formInput.floor,
            capacity: formInput.capacity,
          })
        }
      >
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

        <InputLabel id="demo-simple-select-label">Floor</InputLabel>
        <Select
          label="Floor"
          name="floor"
          className="input-field"
          helperText="Enter participants attending this meeting"
          onChange={handleInput}
        >
          {floors.map((ele) => ele)}
        </Select>
        <TextField
          // required
          label="capacity"
          type="number"
          name="capacity"
          className="input-field"
          helperText="e.g. 2"
          onChange={handleInput}
        />
        <Button type="submit" variant="contained" color="primary">
          Book meeting room
        </Button>
      </form>
    </div>
  );
};

export default MUIForm;
