import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import restaurantData from "../data/restaurant.json";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import HeaderMenu from "../components/Headers/HeaderMenu";
import { t } from "i18next";
import MenuCard from "../components/Cards/MenuCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

// --- Types ---
interface Item {
  id: string;
  name: { fa: string; en: string };
  description: { fa: string; en: string };
  price: number;
  image: string;
}

const allItems: Item[] = restaurantData.restaurant.menu.categories.flatMap(
  (cat) => cat.items
);

const MenuItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  const item = allItems.find((item) => item.id === id);

  const category = restaurantData.restaurant.menu.categories.find((cat) =>
    cat.items.some((it) => it.id === id)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!item) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="error">
          Item not found!
        </Typography>
      </Box>
    );
  }

  const similarItems = category
    ? category.items.filter((it) => it.id !== item.id).slice(0, 4)
    : [];

  const toPersianNumber = (num: number | string) =>
    num
      .toString()
      .replace(
        /\d/g,
        (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][+d]
      );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: item.id,
        nameFa: item.name.fa,
        nameEn: item.name.en,
        price: item.price,
        image: item.image,
      })
    );
  };

  return (
    <Box>
      <HeaderMenu />

      <Container sx={{ mt: 2 }}>
        {/* --- TOP SECTION --- */}
        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
            alignItems: "center",
            mb: 6,
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.name[currentLang]}
            sx={{
              width: "100%",
              maxWidth: 450,
              justifySelf: "center",
            }}
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography
              variant="h5"
              sx={(theme) => ({
                fontWeight: "bold",
                fontSize: { xs: 22, md: 28 },
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
              })}
            >
              {item.name[currentLang]}
            </Typography>

            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.secondary"
                    : "text.lightPrimary",
                fontSize: { xs: 16, md: 20 },
              })}
            >
              {category?.name[currentLang]}
            </Typography>

            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.secondary"
                    : "text.lightPrimary",
                fontSize: { xs: 16, md: 20 },
              })}
            >
              {item.description[currentLang]}
            </Typography>

            <Typography
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.secondary"
                    : "text.lightPrimary",
                fontSize: { xs: 18, md: 22 },
                fontWeight: "bold",
              })}
            >
              {currentLang === "fa"
                ? `${toPersianNumber(item.price)} ریال`
                : `${item.price} Rial`}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#51b6a1",
                  color: "#E7F2EF",
                }}
                onClick={handleAddToCart}
              >
                {t("button.addToCart")}
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => navigate(-1)}
              >
                {t("button.back")}
              </Button>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* --- SIMILAR ITEMS --- */}
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h5"
            sx={(theme) => ({
              fontWeight: "bold",
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              mb: 2,
            })}
          >
            {t("similar.title")}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            {similarItems.map((similar) => (
              <MenuCard
                key={similar.id}
                nameFa={similar.name.fa}
                nameEn={similar.name.en}
                descriptionFa={similar.description.fa}
                descriptionEn={similar.description.en}
                price={
                  currentLang === "fa"
                    ? `${toPersianNumber(similar.price)} ریال`
                    : `${similar.price} Rial`
                }
                image={similar.image}
                lang={currentLang}
                id={similar.id}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default MenuItemPage;
