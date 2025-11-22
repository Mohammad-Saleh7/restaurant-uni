import { createTheme } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: { main: "#007FF" },
        background: {
          default: "#e2c58a",
          lightPaper: "#e2c58a",
        },
        navbar: {
          default: "#e2c58a",
        },
        text: {
          lightPrimary: "#67341b",
          secondary: "white",
          third: "#fcbc4e",
        },
      },
    },

    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#313647",
          darkPaper: "#435663",
        },
        navbar: {
          dNav: "#151d32",
        },
        text: {
          primary: "#E7F2EF",
        },
      },
    },
  },
});

export default theme;
