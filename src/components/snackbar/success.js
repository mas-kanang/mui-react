import { Alert, Snackbar } from "@mui/material";

export default function SuccessSnackbars({ success, setSuccess }) {
  return (
    <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
      <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
        Transaksi Berhasil
      </Alert>
    </Snackbar>
  );
}
