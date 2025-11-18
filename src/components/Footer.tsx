import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

export default function Footer() {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="static"
        sx={{
          backgroundImage: "url('/footer.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "700px",
          boxShadow: "none", // حذف سایه
        }}
      ></AppBar>
    </React.Fragment>
  );
}
