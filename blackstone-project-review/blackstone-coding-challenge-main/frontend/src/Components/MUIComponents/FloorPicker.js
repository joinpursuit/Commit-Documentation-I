import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FloorPicker() {
  const [floor, setFloor] = React.useState("");
  const floors = [];

  for (let i = 1; i <= 100; i++) {
    floors.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }
  const handleChange = (event) => {
    setFloor(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Floor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={floor}
          label="floor"
          onChange={handleChange}
        >
          {floors.map((ele) => ele)}
        </Select>
      </FormControl>
    </Box>
  );
}
