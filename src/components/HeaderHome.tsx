import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { Box, Button, Typography } from "@mui/material";
import { t } from "i18next";
import SettingHeader from "./SettingHeader";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";

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

export default function HeaderHome(props: Props) {
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
                }}
              >
                {t("hero.title")}
              </Typography>
              <Box>
                <Typography
                  variant="h4"
                  component={"h4"}
                  sx={{
                    textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
                  }}
                >
                  {t("hero.subtitle")}
                </Typography>
                <Typography
                  variant="h4"
                  component={"h4"}
                  sx={{
                    textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
                  }}
                >
                  {t("hero.subtitle2")}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    border: "3px solid #fcbc4e",
                    bgcolor: "#ae813e",
                    textShadow: `
      0 2px 4px rgba(0,0,0,0.4),
      0 0 10px rgba(3, 2, 1, 0.6)
    `,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  {t("hero.viewMenu")}
                  <MenuBookOutlinedIcon />
                </Button>
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
