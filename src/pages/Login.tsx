import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";

type LoginFormValues = {
  email: string;
  password: string;
};

const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showPass, setShowPass] = useState(false);
  const [serverMsg, setServerMsg] = useState<string>("");

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormValues) => {
    setServerMsg("");

    // اینجا بعداً می‌تونی auth واقعی بزنی
    if (!data.email || !data.password) {
      setServerMsg(t("login.enterInputs"));
      return;
    }

    alert(t("login.welcome"));
    navigate("/");
    reset();
  };

  return (
    <Box
      sx={(theme) => ({
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        py: 6,
      })}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={0}
          sx={(theme) => ({
            borderRadius: 4,
            p: { xs: 2.5, sm: 4 },
            background:
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.08)"
                : "rgba(255,255,255,0.35)",
            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.14)"
                : "1px solid rgba(103,52,27,0.16)",
            backdropFilter: "blur(10px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 20px 60px rgba(0,0,0,0.35)"
                : "0 18px 50px rgba(103,52,27,0.18)",
          })}
        >
          <Stack spacing={2.2}>
            <Box>
              <Typography
                variant="h4"
                fontWeight={1000}
                sx={(theme) => ({
                  color:
                    theme.palette.mode === "dark"
                      ? theme.palette.text.primary
                      : theme.palette.text.lightPrimary,
                  letterSpacing: 0.3,
                })}
              >
                {t("login.login")}
              </Typography>

              <Typography
                variant="body2"
                sx={(theme) => ({
                  mt: 0.5,
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(231,242,239,0.70)"
                      : "rgba(103,52,27,0.70)",
                })}
              >
                {t("login.enterInputs") ||
                  "Enter your credentials to continue."}
              </Typography>
            </Box>

            <Divider
              sx={(theme) => ({
                borderColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(103,52,27,0.18)",
              })}
            />

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2}>
                <TextField
                  label={t("login.emailPlaceholder")}
                  autoComplete="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={
                    errors.email?.type === "required"
                      ? t("login.emailRequired")
                      : errors.email?.type === "pattern"
                      ? t("login.emailInvalid")
                      : ""
                  }
                  {...register("email", {
                    required: true,
                    pattern: emailPattern,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label={t("login.passwordPlaceholder")}
                  autoComplete="current-password"
                  type={showPass ? "text" : "password"}
                  fullWidth
                  error={!!errors.password}
                  helperText={
                    errors.password?.type === "required"
                      ? t("login.passwordRequired")
                      : errors.password?.type === "pattern"
                      ? t("login.passwordPattern")
                      : ""
                  }
                  {...register("password", {
                    required: true,
                    pattern: passwordPattern,
                  })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass((p) => !p)}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPass ? (
                            <VisibilityOffRoundedIcon />
                          ) : (
                            <VisibilityRoundedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {serverMsg ? (
                  <Alert
                    severity="error"
                    sx={(theme) => ({
                      borderRadius: 3,
                      background:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.08)"
                          : "rgba(255,255,255,0.35)",
                      border:
                        theme.palette.mode === "dark"
                          ? "1px solid rgba(255,255,255,0.14)"
                          : "1px solid rgba(103,52,27,0.16)",
                    })}
                  >
                    {serverMsg}
                  </Alert>
                ) : null}

                <Button
                  type="submit"
                  size="large"
                  disabled={isSubmitting}
                  startIcon={<LoginRoundedIcon sx={{ ml: 1 }} />}
                  sx={(theme) => ({
                    py: 1.2,
                    borderRadius: 3,
                    fontWeight: 1000,
                    letterSpacing: 0.2,
                    color: "#fff",
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(90deg, rgba(7, 4, 23, 0.9), rgba(27, 22, 117, 0.9))"
                        : "linear-gradient(90deg, #67341b, #fcbc4e)",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 10px 25px rgba(14, 14, 96, 0.56)"
                        : "0 12px 28px rgba(103,52,27,0.20)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(90deg, rgba(1, 1, 5, 0.9), rgba(15, 13, 63, 0.9))"
                          : "linear-gradient(90deg, #5a2c17, #f7b640)",
                    },
                    transition: "transform 140ms ease",
                  })}
                  fullWidth
                >
                  {t("login.login")}
                </Button>

                {/* اگر route ثبت نام داری */}
                <Typography
                  variant="body2"
                  sx={(theme) => ({
                    textAlign: "center",
                    color:
                      theme.palette.mode === "dark"
                        ? "rgba(231,242,239,0.70)"
                        : "rgba(103,52,27,0.75)",
                  })}
                >
                  {t("login.noAccount") || "Don't have an account?"}{" "}
                  <Box
                    component={RouterLink}
                    to="/auth/signup"
                    sx={(theme) => ({
                      color:
                        theme.palette.mode === "dark"
                          ? "#a5b4fc"
                          : theme.palette.text.lightPrimary,
                      fontWeight: 900,
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    })}
                  >
                    {t("login.signUp") || "Sign up"}
                  </Box>
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
