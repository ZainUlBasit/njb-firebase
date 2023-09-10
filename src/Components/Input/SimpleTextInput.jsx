import React from "react";
import TextField from "@mui/material/TextField";

const SimpleTextInput = ({
  label,
  placeholder,
  type,
  id,
  name,
  value,
  setValue,
}) => {
  return (
    <div className="w-full mb-[20px] flex justify-center">
      <TextField
        required
        label={label}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[90%] text-white"
      />
    </div>
  );
};

export default SimpleTextInput;
