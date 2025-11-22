// src/components/Cards/MenuCard.tsx

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActions } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import i18n from "../../i18n";

interface MenuCardProps {
  price: number | string; // عدد خام یا رشته (با واحد/کاما/اعداد فارسی)
  catName?: string;
  nameFa: string;
  nameEn: string;
  descriptionFa: string;
  descriptionEn: string;
  image: string;
  id: string;
  lang: "fa" | "en";
}

export default function MenuCard({
  price,
  catName,
  descriptionFa,
  descriptionEn,
  image,
  lang,
  nameFa,
  nameEn,
  id,
}: MenuCardProps) {
  const dispatch = useDispatch();
  const currentLang: "fa" | "en" = i18n.language === "fa" ? "fa" : "en";

  // 🔹 تبدیل امن price به عدد
  function normalizePrice(raw: number | string): number {
    if (typeof raw === "number") return raw;

    // تبدیل اعداد فارسی به انگلیسی
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    let normalized = raw.replace(/[۰-۹]/g, (d) =>
      persianDigits.indexOf(d).toString()
    );

    // حذف کاما، فاصله، واحد پول و هر چیز غیرعددی
    normalized = normalized.replace(/[^\d.-]/g, "");

    const n = Number(normalized);
    return Number.isNaN(n) ? 0 : n;
  }

  const priceRial = normalizePrice(price);

  function toPersianNumber(num: number | string): string {
    return num
      .toString()
      .replace(
        /\d/g,
        (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)]
      );
  }

  // نمایش قیمت
  const displayPrice =
    currentLang === "fa"
      ? `${toPersianNumber(priceRial.toLocaleString("fa-IR"))}`
      : priceRial.toLocaleString("en-US");

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        nameFa,
        nameEn,
        price: priceRial,
        image,
      })
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {catName && <Typography>{catName}</Typography>}

      <Card
        sx={{
          width: "100%",
          maxWidth: 250,
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={nameEn}
          sx={{
            objectFit: "contain",
            width: "100%",
            height: { xs: 180, sm: 200, md: 220, lg: 250 }, // ریسپانسیو ولی نزدیک طراحی اصلی
          }}
        />

        <CardContent
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.default",
            height: "100px",
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lang === "fa" ? nameFa : nameEn}
            </Typography>

            <Typography
              variant="body2"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark" ? "text.secondary" : undefined,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              })}
            >
              {lang === "fa" ? descriptionFa : descriptionEn}
            </Typography>
          </Box>

          <Typography>
            {t("cart.price")}: {displayPrice}
          </Typography>
        </CardContent>

        <CardActions
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.default",
            mt: "auto",
            display: "flex",
            gap: 1,
          })}
        >
          <Button
            variant="contained"
            sx={(theme) => ({
              width: 120,
              justifyContent: "center",
              whiteSpace: "nowrap",
              bgcolor:
                theme.palette.mode === "dark"
                  ? "background.default"
                  : "#67341b",
              borderColor:
                theme.palette.mode === "dark"
                  ? "background.default"
                  : "text.lightPrimary",
              height: 36,
            })}
          >
            <Link
              to={`/menu/${id}`}
              style={{
                textDecoration: "none",
                color: "#E7F2EF",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {t("button.viewDetails")}
            </Link>
          </Button>

          <Button
            variant="contained"
            sx={{
              width: 120,
              whiteSpace: "nowrap",
              height: 36,
              bgcolor: "#51b6a1",
              color: "white",
            }}
            onClick={handleAddToCart}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
              {t("button.addToCart")}
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
