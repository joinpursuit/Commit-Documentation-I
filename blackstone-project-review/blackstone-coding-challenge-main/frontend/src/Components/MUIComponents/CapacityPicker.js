import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CapacityPicker = () => {
  const capacity = ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div id="capacity-picker-container">
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Capacity</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          defaultValue={""}
          label="Capacity"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {capacity.map((int, i) => (
            <MenuItem key={i} value={int}>
              {int}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CapacityPicker;
