import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const buttonsName = [
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
  return (
    <div>
      <Box sx={{ display: "flex", gap: 2 }}>
        {buttonsName.map((el) => (
          <Button
            onClick={() => navigate(`/${el.en.toLowerCase().replace(" ", "")}`)}
            key={el.en}
            variant="contained"
            sx={{
              border: "3px solid #fcbc4e",
              bgcolor: "#ae813e",
              textShadow: `
                0 2px 4px rgba(0,0,0,0.4),
                0 0 10px rgba(3, 2, 1, 0.6)
              `,
              width: 150,
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.2)",
              },
            }}
          >
            {lang === "fa" ? el.fa : el.en}
          </Button>
        ))}
      </Box>
    </div>
  );
};

export default ButtonHome;
