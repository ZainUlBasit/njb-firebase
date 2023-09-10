import React, { useState } from "react";
import CustomModal from "./CustomModal";
import SimpleTextInput from "../Input/SimpleTextInput";
import ModalBottomLine from "./ModalBottomLine";
import ModalButton from "../Buttons/ModalButton";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CPModal = ({ open, setOpen }) => {
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(OldPassword, NewPassword);
  };

  return (
    <CustomModal title={"Change Password"} open={open} setOpen={setOpen}>
      <form className="flex flex-col justify-center items-center pt-[10px]">
        {/* old password */}
        <FormControl sx={{ m: 1, width: "38ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Old Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-old"
            type={showOldPassword ? "text" : "password"}
            required
            value={OldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowOldPassword}
                  onMouseDown={handleMouseDownOldPassword}
                  edge="end"
                >
                  {showOldPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Old Password"
          />
        </FormControl>
        {/* new password */}
        <FormControl sx={{ m: 1, width: "38ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password-new"
            type={showNewPassword ? "text" : "password"}
            required
            value={NewPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                  edge="end"
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>
        <ModalBottomLine />
      </form>
      <div className="flex justify-center items-center">
        <ModalButton title={"Change Password"} onClick={onSubmit} />
      </div>
    </CustomModal>
  );
};

export default CPModal;
