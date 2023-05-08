import { Alert, Button, Snackbar } from "@mui/material";

export default function ErrorSnackbars({ error, setError }) {
  return (
    <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
      <Alert onClose={() => setError(false)} severity="error" sx={{ width: "100%" }}>
        Transaksi Gagal
      </Alert>
    </Snackbar>
  );
}
