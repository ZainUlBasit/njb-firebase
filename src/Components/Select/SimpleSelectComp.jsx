import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SimpleSelectComp({ value, setValue, label, data }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="w-[90%] mb-[20px]">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          {data.map((d) => {
            return (
              <MenuItem value={d._id}>
                {d.name || d.itemname}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
