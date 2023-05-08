import JoditEditor from "jodit-react";
import { useRef } from "react";

const Jodit = ({ setValue }) => {
  const editor = useRef(null);
  return <JoditEditor ref={editor} onChange={(content) => setValue(content)} />;
};

export default Jodit;
