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

export default function PermohonanResults ({ permohonans, viewData, editData, deleteData, ...rest }) {
  const [selectedPermohonanIds, setSelectedPermohonanIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
  const [hapus, setHapus] = useState(false);
  const router = useRouter();

  const handleSelectAll = (event) => {
    let newSelectedPermohonanIds;

    if (event.target.checked) {
      newSelectedPermohonanIds = permohonans.map((permohonan) => permohonan.id);
    } else {
      newSelectedPermohonanIds = [];
    }

    setSelectedPermohonanIds(newSelectedPermohonanIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPermohonanIds.indexOf(id);
    let newSelectedPermohonanIds = [];

    if (selectedIndex === -1) {
      newSelectedPermohonanIds = newSelectedPermohonanIds.concat(selectedPermohonanIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPermohonanIds = newSelectedPermohonanIds.concat(selectedPermohonanIds.slice(1));
    } else if (selectedIndex === selectedPermohonanIds.length - 1) {
      newSelectedPermohonanIds = newSelectedPermohonanIds.concat(
        selectedPermohonanIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedPermohonanIds = newSelectedPermohonanIds.concat(
        selectedPermohonanIds.slice(0, selectedIndex),
        selectedPermohonanIds.slice(selectedIndex + 1)
      );
    }

    setSelectedPermohonanIds(newSelectedPermohonanIds);
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

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedPermohonanIds.length === permohonans.length}
                    color="primary"
                    indeterminate={
                      selectedPermohonanIds.length > 0 &&
                      selectedPermohonanIds.length < permohonans.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Nomor Surat</TableCell>
                <TableCell>Tanggal Surat</TableCell>
                <TableCell>keterangan</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permohonans.length < 1 && (
                <TableRow>
                  <TableCell>Data Kosong</TableCell>
                </TableRow>
              )}
              {permohonans.slice(page * limit, (page + 1) * limit).map((permohonan) => (
                <TableRow
                  hover
                  key={permohonan.id}
                  selected={selectedPermohonanIds.indexOf(permohonan.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPermohonanIds.indexOf(permohonan.id) !== -1}
                      onChange={(event) => handleSelectOne(event, permohonan.id)}
                      value="true"
                    />
                  </TableCell> */}

                  <TableCell>{permohonan.no_surat}</TableCell>
                  <TableCell>{permohonan.tgl_surat}</TableCell>
                  <TableCell>{permohonan.keterangan}</TableCell>
                  <TableCell sx={{ display: "flex" }}>
                    <IconButton onClick={() => router.push(`/permohonans/${permohonan.id}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => editData(permohonan.id)}>
                      <Create />
                    </IconButton>
                    <IconButton onClick={() => setHapus(true)}>
                      <DeleteForever />
                    </IconButton>
                    <AlertDialog
                      hapus={hapus}
                      setHapus={setHapus}
                      data={permohonan}
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
        count={permohonans.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10]}
      />
    </Card>
  );
};

PermohonanResults.propTypes = {
  permohonans: PropTypes.array.isRequired,
};
