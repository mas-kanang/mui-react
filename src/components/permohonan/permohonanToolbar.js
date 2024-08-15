import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  IconButton,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { Clear, ResetTv } from "@mui/icons-material";
import ModalPermohonan from "./modalPermohonan";

export default function PermohonanToolbar ({ saveData, search, setSearch, cariData, resetSearch }) {
  function handleSearch(e) {
    e.preventDefault();
    cariData();
  }
  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    // console.log(search);
  };
  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Daftar Permohonan
        </Typography>
        <Box sx={{ m: 1, display: "flex" }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <ModalPermohonan saveData={saveData} />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                label="cari permohonan"
                variant="outlined"
                value={search}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleSearch(e);
                  }
                }}
              />
              <IconButton type="button" sx={{ padding: "10px" }} onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <IconButton type="button" sx={{ padding: "10px" }} onClick={resetSearch}>
                <Clear />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
