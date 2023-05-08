import Head from "next/head";
import { Box, Container, Divider, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import Quill from "../../components/quill";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  const USER_API_BASE_URL = "http://localhost:8080/konfirmasi";
  const [aju, setAju] = useState({});
  const [value, setValue] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchData(id);
  }, []);

  const fetchData = async (id) => {
    const response = await fetch(USER_API_BASE_URL + "/" + id, {
      method: "GET",
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong");
    }

    const res = await response.json();
    setAju(res);
  };
  return (
    <>
      <Head>
        <title>Account | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Box sx={{ ml: 3, mb: 4 }}>
          <Typography variant="h5">{aju.importir}</Typography>
          <Typography variant="subtitle1">{aju.ppjk}</Typography>
          <Typography variant="subtitle1">{aju.car}</Typography>
        </Box>
        <Quill value={value} setValue={setValue} />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
