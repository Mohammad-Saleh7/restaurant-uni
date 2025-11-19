import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import SettingHeader from "../SettingHeader";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

export default function HeaderMenu(props: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            backgroundImage: "url('/nav-home.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "700px",
            position: "static",
            boxShadow:
              "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
            // backgroundColor: "transparent",
            // boxShadow: "none",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100%",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <Typography
                onClick={() => navigate("/")}
                variant="h1"
                component={"h1"}
                color="#fcbc4e"
                px={2}
                sx={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  WebkitTextStroke: "1px #000",
                  textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(212,175,55,0.6)
    `,
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s",
                  },
                }}
              >
                {t("hero.title")}
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <KeyboardBackspaceIcon
                  sx={{
                    mr: 1,
                    cursor: "pointer",
                    border: "3px solid #67341b",
                    color: "#67341b",
                    borderRadius: "50%",
                    "&:hover": { scale: 1.1, transition: "0.3s all" },
                    fontSize: 40,
                  }}
                  onClick={() => window.history.back()}
                />
                <SettingHeader />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}
