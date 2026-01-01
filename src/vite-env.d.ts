/// <reference types="vite/client" />

import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeText {
    lightPrimary?: string;
    third?: string;
  }

  interface TypeBackground {
    lightPaper?: string;
    darkPaper?: string;
  }

  interface Palette {
    navbar?: {
      default?: string;
      dNav?: string;
      main?: string;
      contrastText?: string;
    };
  }

  interface PaletteOptions {
    navbar?: {
      default?: string;
      dNav?: string;
      main?: string;
      contrastText?: string;
    };
  }
}

export {};
