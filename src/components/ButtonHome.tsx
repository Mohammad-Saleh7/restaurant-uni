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
        gap: 2,
        flexWrap: "wrap", // ← ریسپانسیو
        justifyContent: "center", // ← وسط‌چین روی موبایل
      }}
    >
      {buttonsName.map((el) => (
        <Button
          key={el.en}
          onClick={() => handleNavigate(el.en)}
          variant="contained"
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.lightPaper",
            width: { xs: "120px", sm: "150px" }, // ← ریسپانسیو
            transition: "all 0.3s",
            "&:hover": {
              transform: "scale(1.2)",
            },
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
        >
          {lang === "fa" ? el.fa : el.en}
        </Button>
      ))}
    </Box>
  );
};

export default ButtonHome;
