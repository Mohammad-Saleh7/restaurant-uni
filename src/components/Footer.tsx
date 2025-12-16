import type { FC } from "react";
import * as React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { t } from "i18next";

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={(theme) => ({
        mt: { xs: 6, md: 10 },
        py: { xs: 3, md: 4 },
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(21,29,50,0.85), rgba(49,54,71,0.85))"
            : "linear-gradient(180deg, #a8926a, #8f7a55)",

        borderTop:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.10)"
            : "1px solid rgba(103,52,27,0.18)",
        backdropFilter: "blur(10px)",
      })}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2.5, md: 2 }}
          alignItems={{ xs: "center", md: "center" }}
          justifyContent="space-between"
          sx={{ textAlign: { xs: "center", md: "left" } }}
        >
          {/* Left */}
          <Box>
            <Typography
              sx={(theme) => ({
                fontWeight: 900,
                letterSpacing: 0.2,
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.text.primary
                    : theme.palette.text.lightPrimary,
                fontSize: { xs: 16, sm: 18 },
              })}
            >
              {t("footer.title")}
            </Typography>

            <Typography
              sx={(theme) => ({
                mt: 0.8,
                fontSize: { xs: 13, sm: 14 },
                color:
                  theme.palette.mode === "dark"
                    ? "rgba(231,242,239,0.72)"
                    : "rgba(103,52,27,0.72)",
                maxWidth: 520,
              })}
            >
              {t("footer.subtitle") ||
                "Fresh taste, fast order, smooth experience."}
            </Typography>
          </Box>

          {/* Right (Links) */}
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            justifyContent="center"
            sx={{ rowGap: 1 }}
          >
            <FooterLink to="/">{t("footer.home")}</FooterLink>
            <FooterLink to="/menu">{t("footer.menu")}</FooterLink>
            <FooterLink to="/cart">{t("footer.cart")}</FooterLink>
          </Stack>
        </Stack>

        <Divider
          sx={(theme) => ({
            my: { xs: 2.5, md: 3 },
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.10)"
                : "rgba(103,52,27,0.18)",
          })}
        />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ textAlign: { xs: "center", sm: "left" } }}
        >
          <Typography
            sx={(theme) => ({
              fontSize: 13,
              color:
                theme.palette.mode === "dark"
                  ? "rgba(231,242,239,0.65)"
                  : "rgba(103,52,27,0.70)",
            })}
          >
            © {new Date().getFullYear()} Restaurant Uni — All rights reserved.
          </Typography>

          <Typography
            sx={(theme) => ({
              fontSize: 13,
              color:
                theme.palette.mode === "dark"
                  ? "rgba(231,242,239,0.65)"
                  : "rgba(103,52,27,0.70)",
            })}
          >
            {t("footer.madeBy") || "Made with ❤ using React + MUI"}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

/* ---------------- Small reusable link button ---------------- */
function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      component={RouterLink}
      to={to}
      variant="text"
      sx={(theme) => ({
        px: 1.8,
        py: 0.9,
        borderRadius: 999,
        fontWeight: 900,
        letterSpacing: 0.2,

        color:
          theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.text.lightPrimary,

        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255,255,255,0.12)"
            : "1px solid rgba(103,52,27,0.22)",

        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(255,255,255,0.06)"
            : "rgba(255,255,255,0.35)",

        transition:
          "transform 140ms ease, background 140ms ease, border-color 140ms ease",

        "&:hover": {
          transform: "translateY(-1px)",
          bgcolor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.10)"
              : "rgba(255,255,255,0.55)",
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.22)"
              : "rgba(103,52,27,0.35)",
        },
      })}
    >
      {children}
    </Button>
  );
}
