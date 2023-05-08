import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { Create, DeleteForever, Visibility } from "@mui/icons-material";
import { useRouter } from "next/router";
import AlertDialog from "../snackbar/dialog";

export const SubmissionListResults = ({ submissions, viewData, editData, deleteData, ...rest }) => {
  const [selectedSubmissionIds, setSelectedSubmissionIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [hapus, setHapus] = useState(false);
  const router = useRouter();

  const handleSelectAll = (event) => {
    let newSelectedSubmissionIds;

    if (event.target.checked) {
      newSelectedSubmissionIds = submissions.map((submission) => submission.id);
    } else {
      newSelectedSubmissionIds = [];
    }

    setSelectedSubmissionIds(newSelectedSubmissionIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSubmissionIds.indexOf(id);
    let newSelectedSubmissionIds = [];

    if (selectedIndex === -1) {
      newSelectedSubmissionIds = newSelectedSubmissionIds.concat(selectedSubmissionIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSubmissionIds = newSelectedSubmissionIds.concat(selectedSubmissionIds.slice(1));
    } else if (selectedIndex === selectedSubmissionIds.length - 1) {
      newSelectedSubmissionIds = newSelectedSubmissionIds.concat(
        selectedSubmissionIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedSubmissionIds = newSelectedSubmissionIds.concat(
        selectedSubmissionIds.slice(0, selectedIndex),
        selectedSubmissionIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSubmissionIds(newSelectedSubmissionIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const hapusData = (id) => {
    deleteData(id);
    setHapus(false);
  };

  console.clear();

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedSubmissionIds.length === submissions.length}
                    color="primary"
                    indeterminate={
                      selectedSubmissionIds.length > 0 &&
                      selectedSubmissionIds.length < submissions.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Nomor Aju</TableCell>
                <TableCell>Importir</TableCell>
                <TableCell>PPJK</TableCell>
                <TableCell>Jenis</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.length < 1 && (
                <TableRow>
                  <TableCell>Data Kosong</TableCell>
                </TableRow>
              )}
              {submissions.slice(page * limit, (page + 1) * limit).map((submission) => (
                <TableRow
                  hover
                  key={submission.id}
                  selected={selectedSubmissionIds.indexOf(submission.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSubmissionIds.indexOf(submission.id) !== -1}
                      onChange={(event) => handleSelectOne(event, submission.id)}
                      value="true"
                    />
                  </TableCell> */}

                  <TableCell>{submission.car}</TableCell>
                  <TableCell>{submission.importir}</TableCell>
                  <TableCell>{submission.ppjk}</TableCell>
                  <TableCell>{submission.type}</TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    <IconButton onClick={() => router.push(`/submissions/${submission.id}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => editData(submission.id)}>
                      <Create />
                    </IconButton>
                    <IconButton onClick={() => setHapus(true)}>
                      <DeleteForever />
                    </IconButton>
                    <AlertDialog
                      hapus={hapus}
                      setHapus={setHapus}
                      data={submission}
                      hapusData={hapusData}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={submissions.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10]}
      />
    </Card>
  );
};

SubmissionListResults.propTypes = {
  submissions: PropTypes.array.isRequired,
};
