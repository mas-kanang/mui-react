import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/dashboard-layout";
import AlertDialog from "../../components/snackbar/dialog";
import ErrorSnackbars from "../../components/snackbar/error";
import SuccessSnackbars from "../../components/snackbar/success";
import EditSubmission from "../../components/submission/editSubmission";
import { SubmissionListResults } from "../../components/submission/submission-list-results";
import { SubmissionListToolbar } from "../../components/submission/submission-list-toolbar";

const Page = () => {
  const USER_API_BASE_URL = "http://localhost:8080/konfirmasi";
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [aju, setAju] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function resetSearch() {
    setSearch("");
    fetchData();
  }

  function filterByValue(array, string) {
    return array.filter(
      (val) =>
        val.importir.toLowerCase().includes(string.toLowerCase()) ||
        val.car.toLowerCase().includes(string.toLowerCase()) ||
        val.ppjk.toLowerCase().includes(string.toLowerCase())
    );
  }

  useEffect(() => {
    fetchData();
  }, [responseData]);

  const cariData = () => {
    setSubmissions(filterByValue(submissions, search));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(USER_API_BASE_URL, {
        method: "GET",
      });
      const res = await response.json();
      // console.log(res);
      setSubmissions(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const saveData = async (data) => {
    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (!response.ok) {
      setError(true);
      return;
    }
    setResponseData(response);
    setSuccess(true);
  };

  const updateData = async (data) => {
    const response = await fetch(USER_API_BASE_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      setError(true);
      return;
    }
    setResponseData(response);
    setSuccess(true);
  };

  const deleteData = async (id) => {
    const response = await fetch(USER_API_BASE_URL + "/" + id, {
      method: "DELETE",
    });

    console.log(response);
    if (!response.ok) {
      setError(true);
      return;
    }
    setResponseData(response);
    setSuccess(true);
  };

  const editData = async (id) => {
    const response = await fetch(USER_API_BASE_URL + "/" + id, {
      method: "GET",
    });

    if (!response.ok) {
      setError(true);
      return;
    }

    const res = await response.json();
    // console.log(res);
    setAju(res);
    setIsOpen(true);
  };

  return (
    <>
      <Head>
        <title>Submissions | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <SubmissionListToolbar
            saveData={saveData}
            search={search}
            setSearch={setSearch}
            cariData={cariData}
            resetSearch={resetSearch}
          />
          <EditSubmission
            aju={aju}
            isOpen={isOpen}
            openModal={openModal}
            closeModal={closeModal}
            updateData={updateData}
          />
          <Box sx={{ mt: 3 }}>
            <SubmissionListResults
              submissions={submissions}
              deleteData={deleteData}
              editData={editData}
            />
            <SuccessSnackbars success={success} setSuccess={setSuccess} />
            <ErrorSnackbars error={error} setError={setError} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
