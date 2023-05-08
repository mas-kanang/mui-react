import { Box, Container, Divider, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, 7] }, { font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function Quill({ value, setValue }) {
  return (
    <Container>
      <Divider />
      <Typography>Quill Editor</Typography>
      <Box>
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
      </Box>
      <Divider />
      <Box>
        <Typography>Preview</Typography>
        <Divider />
        <div dangerouslySetInnerHTML={{ __html: value }} />
        <div>{value}</div>
      </Box>
      <Divider />
    </Container>
  );
}
