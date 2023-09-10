// By Default
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function CustomModal({ open, setOpen, title, children }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div className="border-b-[2px] border-b-[#032248] text-[##032248] text-[1.6rem] font-[raleway] font-[700] uppercase text-center pb-[20px] select-none">
                {title}
              </div>
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              {children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}