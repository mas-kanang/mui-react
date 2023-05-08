import { AddBoxRounded, AddIcCallRounded, AddRounded } from "@mui/icons-material";
import { Box, Button, Fab, Modal, Typography } from "@mui/material";
import React from "react";
import Quill from "./quill";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Modals() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddRounded />
      </Fab>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style} borderRadius={5} margin={2} textAlign="center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Form Input
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
