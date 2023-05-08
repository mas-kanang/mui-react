import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalSubmission({ saveData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({
    car: "",
    importir: "",
    ppjk: "",
  });

  function handleSave(e) {
    e.preventDefault();
    saveData(data);
    resetData(e);
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setData({ ...data, [event.target.name]: value });
    // console.log(data);
  };

  const resetData = (e) => {
    e.preventDefault();
    setData({
      car: "",
      importir: "",
      ppjk: "",
    });
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" aria-label="add" onClick={handleOpen}>
        Add Submissions
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style} borderRadius={2} margin={2} textAlign="center">
          <Stack rowGap={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={3}>
              Input Submission
            </Typography>
            <TextField
              fullWidth
              required
              label="Nomor Aju"
              name="car"
              value={data.car}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              fullWidth
              required
              label="Importir"
              name="importir"
              value={data.importir}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              fullWidth
              required
              label="PPJK"
              name="ppjk"
              value={data.ppjk}
              onChange={(e) => handleChange(e)}
            />
            <Box sx={{ display: "flex" }}>
              <Button
                color="primary"
                variant="contained"
                aria-label="add"
                onClick={handleSave}
                sx={{ marginRight: 3 }}
              >
                Submit
              </Button>
              <Button color="secondary" variant="contained" aria-label="add" onClick={resetData}>
                Reset
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
