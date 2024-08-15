import { Box } from "@mui/material";
import { useRouter } from "next/router";

export default function LayananDetail({ data }) {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box pageTitle="Post Detail">
      <p>{data.name}</p>
      <p>{data.email}</p>
      <p>{data.phone}</p>
      <p>{data.website}</p>
    </Box>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const datausers = await res.json();
  const paths = datausers.map((item) => ({
    params: {
      id: `${item.id}`,
    },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const datausers = await res.json();
  return {
    props: {
      data: datausers,
    },
  };
}
