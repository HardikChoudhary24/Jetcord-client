import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
export const AutoSizeTextArea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-weight: 300;
    font-size:1rem;
    margin-bottom:5px;
    color: white;
    font-size:1.12rem;
    background: #141515;
    border: none;

    resize:none;
    &:hover {
      border-color: none;
      outline:none;
    }

    &:focus {
      outline: 0;
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
