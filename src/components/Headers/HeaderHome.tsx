import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import SettingHome from "../settings/SettingsHome";

function ElevationScroll(props) {
  const { children, window: windowProp } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 8,
    target: windowProp ? windowProp() : undefined,
  });

  if (!children) return null;

  return React.cloneElement(children, {
    sx: {
      ...(children.props.sx || {}),
      transform: trigger ? "translateY(0)" : "translateY(0)",
    },
  });
}

export default function HeaderHome(props) {
  const navigate = useNavigate();
  const theme = useTheme();

  const bg =
    theme.palette.mode === "dark" ? "/nav-home-dark.png" : "/nav-home.png";

  return (
    <React.Fragment>
      <CssBaseline />

      {/* ✅ Navbar Glass (Sticky) */}
      <ElevationScroll {...props}>
        <AppBar
          position="sticky"
          sx={{
            bgcolor: "rgba(10,14,24,0.35)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ px: { xs: 0, sm: 0 }, minHeight: 74 }}>
              <Box
                onClick={() => navigate("/")}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  userSelect: "none",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2.5,
                    background:
                      "linear-gradient(135deg, rgba(34,197,94,0.9), rgba(79,70,229,0.9))",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                >
                  <RestaurantMenuRoundedIcon sx={{ color: "#fff" }} />
                </Box>

                <Typography
                  sx={{
                    fontWeight: 900,
                    letterSpacing: 0.3,
                    color: "#fff",
                    fontSize: { xs: 18, sm: 20 },
                  }}
                >
                  Restaurant Uni
                </Typography>
              </Box>

              <Box sx={{ flex: 1 }} />

              <Stack direction="row" spacing={1} alignItems="center">
                <Button
                  variant="text"
                  onClick={() => navigate("/menu")}
                  startIcon={<MenuBookOutlinedIcon />}
                  sx={navTextBtnSX}
                >
                  {t("hero.viewMenu")}
                </Button>

                <SettingHome />

                <Button
                  variant="outlined"
                  onClick={() => navigate("/auth/login")}
                  startIcon={<LoginRoundedIcon />}
                  sx={navOutlineBtnSX}
                >
                  {t("login.login")}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/auth/signup")}
                  startIcon={<PersonAddAltRoundedIcon />}
                  sx={navCtaBtnSX}
                >
                  {t("login.signUp")}
                </Button>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>

      {/* ✅ Hero Section با بک‌گراند تصویرت */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "78vh", sm: 640, md: 700 },
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        {/* overlay برای خوانایی */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(11,16,32,0.65) 0%, rgba(11,16,32,0.55) 45%, rgba(11,16,32,0.85) 100%)",
          }}
        />

        {/* glow */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(1000px 500px at 20% 20%, rgba(124,58,237,0.30), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(34,197,94,0.22), transparent 60%)",
            pointerEvents: "none",
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            minHeight: { xs: "78vh", sm: 640, md: 700 },
            display: "grid",
            placeItems: "center",
            py: { xs: 6, sm: 8 },
          }}
        >
          <Box sx={{ textAlign: "center", maxWidth: 860 }}>
            <Typography
              onClick={() => navigate("/")}
              variant="h1"
              sx={{
                color: "#fff",
                cursor: "pointer",
                fontSize: { xs: "2.2rem", sm: "3.1rem", md: "4rem" },
                lineHeight: 1.05,
                textShadow: "0 14px 40px rgba(0,0,0,0.45)",
                transition: "transform 180ms ease",
                "&:hover": { transform: "translateY(-2px)" },
              }}
            >
              {t("hero.title")}
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem" },
              }}
            >
              {t("hero.subtitle")}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: "rgba(255,255,255,0.78)",
                fontSize: { xs: "1.05rem", sm: "1.2rem", md: "1.35rem" },
              }}
            >
              {t("hero.subtitle2")}
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ mt: 4, justifyContent: "center" }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/menu")}
                startIcon={<MenuBookOutlinedIcon />}
                sx={heroPrimaryBtnSX}
              >
                {t("hero.viewMenu")}
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/auth/login")}
                startIcon={<LoginRoundedIcon />}
                sx={heroOutlineBtnSX}
              >
                {t("login.login")}
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}

const navTextBtnSX = {
  color: "rgba(255,255,255,0.9)",
  fontWeight: 900,
  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
};

const navOutlineBtnSX = {
  color: "#fff",
  borderColor: "rgba(255,255,255,0.32)",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.65)",
    bgcolor: "rgba(255,255,255,0.08)",
  },
};

const navCtaBtnSX = {
  fontWeight: 950,
  color: "#fff",
  background: "linear-gradient(90deg, #22c55e, #4f46e5)",
  "&:hover": { background: "linear-gradient(90deg, #16a34a, #4338ca)" },
};

const heroPrimaryBtnSX = {
  py: 1.25,
  px: 2.5,
  borderRadius: 999,
  fontWeight: 950,
  color: "#fff",
  background: "linear-gradient(90deg, #22c55e, #4f46e5)",
  boxShadow: "0 18px 50px rgba(0,0,0,0.35)",
  "&:hover": { background: "linear-gradient(90deg, #16a34a, #4338ca)" },
};

const heroOutlineBtnSX = {
  py: 1.25,
  px: 2.5,
  borderRadius: 999,
  fontWeight: 950,
  color: "#fff",
  borderColor: "rgba(255,255,255,0.40)",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.70)",
    bgcolor: "rgba(255,255,255,0.10)",
  },
};
