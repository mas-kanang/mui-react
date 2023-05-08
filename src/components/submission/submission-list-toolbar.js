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
import ModalSubmission from "./modalSubmission";
import { useState } from "react";
import { Clear, ResetTv } from "@mui/icons-material";

export const SubmissionListToolbar = ({ saveData, search, setSearch, cariData, resetSearch }) => {
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
          Submissions
        </Typography>
        <Box sx={{ m: 1, display: "flex" }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Import
          </Button>
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Export
          </Button>
          <ModalSubmission saveData={saveData} />
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                label="Search submission"
                variant="outlined"
                value={search}
                onChange={(e) => handleChange(e)}
                onKeyPress={(e) => {
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
