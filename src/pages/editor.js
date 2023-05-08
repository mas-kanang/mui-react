import Head from "next/head";
import { Box, Container, Divider, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import Quill from "../components/quill";

const Page = () => {
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
        <Quill />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
