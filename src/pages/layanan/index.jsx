import Head from "next/head";
import { Box, Typography } from "@mui/material";
import { DashboardLayout } from "../../components/dashboard-layout";
import { useRouter } from "next/router";

const Page = ({ data }) => {
  const router = useRouter();
  console.log(data);
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
        {data.map((item) => {
          return (
            <Box key={item.id} onClick={() => router.push(`/layanan/${item.id}`)}>
              <Typography>{item.nama}</Typography>
              <Typography>{item.deskripsi}</Typography>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export async function getStaticProps() {
  const res = await fetch(process.env.LAYANAN);
  const data1 = await res.json();
  return {
    props: {
      data: data1.data.data,
    },
  };
}
