import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ hapus, setHapus, data, hapusData }) {
  return (
    <div>
      <Dialog
        open={hapus}
        onClose={() => setHapus(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anda yakin akan menghapus permohonan dengan nomor Aju {data.car} ini ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHapus(false)}>Tidak Setuju</Button>
          <Button onClick={() => hapusData(data.id)}>Setuju</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
