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

export default function ModalPermohonan({ saveData }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({
    no_surat: "",
    tgl_surat: "",
    keterangan: "",
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
        Tambah Permohonan
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style} borderRadius={2} margin={2} textAlign="center">
          <Stack rowGap={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={3}>
              Rekam Permohonan
            </Typography>
            <TextField
              fullWidth
              required
              label="Nomor Surat"
              name="no_surat"
              value={data.no_surat}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              fullWidth
              required
              label="Tanggal Surat"
              name="tgl_surat"
              value={data.tgl_surat}
              onChange={(e) => handleChange(e)}
            />
            <TextField
              fullWidth
              required
              label="Keterangan"
              name="keterangan"
              value={data.keterangan}
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
