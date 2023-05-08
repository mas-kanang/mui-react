import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";

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

export default function EditSubmission({ aju, isOpen, openModal, closeModal, updateData }) {
  const [data, setData] = React.useState({
    car: "",
    importir: "",
    ppjk: "",
  });
  useEffect(() => {
    setData(aju);
  }, [aju]);

  function handleSave(e) {
    e.preventDefault();
    updateData(data);
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
    closeModal();
  };

  return (
    <Modal open={isOpen} onClose={closeModal} aria-labelledby="modal-modal-title">
      <Box sx={style} borderRadius={2} margin={2} textAlign="center">
        <Stack rowGap={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={3}>
            Update Submission
          </Typography>
          <TextField
            fullWidth
            required
            label="Nomor Aju"
            name="car"
            value={data.car || ""}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            required
            label="Importir"
            name="importir"
            value={data.importir || ""}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            fullWidth
            required
            label="PPJK"
            name="ppjk"
            value={data.ppjk || ""}
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
              Update
            </Button>
            <Button color="secondary" variant="contained" aria-label="add" onClick={closeModal}>
              Close
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
