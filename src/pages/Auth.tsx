import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import React from "react";

const Auth: React.FC = () => {
  return (
    <div>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <div>
            <Outlet />
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Auth;
