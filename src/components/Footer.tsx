import type { FC } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { t } from "i18next";

const Footer: FC = () => {
  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="static"
        sx={(theme) => ({
          bgcolor: theme.palette.background.default,
          boxShadow: "none",
        })}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            flexDirection: { xs: "column", sm: "row" },
            textAlign: { xs: "center", sm: "left" },
            gap: { xs: 2, sm: 0 },
            py: { xs: 2, sm: 1 },
          }}
        >
          {/* ------------------ LEFT SECTION ------------------ */}
          <Box sx={{ px: { xs: 0, sm: 4 } }}>
            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
              })}
            >
              {t("footer.title")}
            </Typography>
          </Box>

          {/* ------------------ RIGHT SECTION ------------------ */}
          <Box
            sx={{
              px: { xs: 0, sm: 4 },
              display: "flex",
              gap: { xs: 1, sm: 2 },
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              component={Link}
              to="/"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
                "&:hover": { scale: 1.5, transition: "all 0.3s" },
              })}
            >
              {t("footer.home")}
            </Button>

            <Button
              variant="text"
              component={Link}
              to="/menu"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
                "&:hover": { scale: 1.5, transition: "all 0.3s" },
              })}
            >
              {t("footer.menu")}
            </Button>

            <Button
              variant="text"
              component={Link}
              to="/cart"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
                "&:hover": { scale: 1.5, transition: "all 0.3s" },
              })}
            >
              {t("footer.cart")}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Footer;
