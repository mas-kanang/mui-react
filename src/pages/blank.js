import Head from "next/head";
import { Box } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import Modals from "../components/modal";

const Page = () => {
  return (
    <>
      <Head>
        <title>Blank | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Modals />
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
