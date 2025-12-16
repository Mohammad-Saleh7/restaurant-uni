import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ButtonItem {
  en: string;
  fa: string;
}

const buttonsName: ButtonItem[] = [
  { en: "Appetizers", fa: "پیش‌غذاها" },
  { en: "Salads", fa: "سالادها" },
  { en: "Main Courses", fa: "غذاهای اصلی" },
  { en: "Drinks", fa: "نوشیدنی‌ها" },
];

interface Props {
  lang: "en" | "fa";
}

const ButtonHome: React.FC<Props> = ({ lang }) => {
  const navigate = useNavigate();

  const handleNavigate = (name: string) => {
    navigate(`/${name.toLowerCase().replace(/\s+/g, "")}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: { xs: 1.5, sm: 2 },
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {buttonsName.map((el) => (
        <Button
          key={el.en}
          onClick={() => handleNavigate(el.en)}
          disableElevation
          sx={(theme) => ({
            px: { xs: 2.5, sm: 3 },
            py: 1.2,
            minWidth: { xs: 120, sm: 150 },
            borderRadius: 999,
            fontWeight: 900,
            letterSpacing: 0.3,

            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : theme.palette.text.lightPrimary,

            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(180deg, #435663, #313647)"
                : "linear-gradient(180deg, #e2c58a, #cdb06f)",

            border:
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(103,52,27,0.25)",

            boxShadow:
              theme.palette.mode === "dark"
                ? "0 8px 20px rgba(0,0,0,0.35)"
                : "0 8px 20px rgba(103,52,27,0.25)",

            transition:
              "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",

            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 12px 28px rgba(0,0,0,0.45)"
                  : "0 12px 28px rgba(103,52,27,0.35)",

              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(180deg, #4f6370, #3a4056)"
                  : "linear-gradient(180deg, #edd08f, #d6b874)",
            },

            "&:active": {
              transform: "translateY(0)",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 6px 14px rgba(0,0,0,0.35)"
                  : "0 6px 14px rgba(103,52,27,0.25)",
            },
          })}
        >
          {lang === "fa" ? el.fa : el.en}
        </Button>
      ))}
    </Box>
  );
};

export default ButtonHome;
