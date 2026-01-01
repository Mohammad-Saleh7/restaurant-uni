import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    lightPrimary?: string;
  }

  interface TypeBackground {
    lightPaper?: string;
    darkPaper?: string;
  }
}

export {};
