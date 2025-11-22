import React from "react";
import HeaderMenu from "../../components/Headers/HeaderMenu";
import { Box, Container, Typography } from "@mui/material";
import restaurantData from "../../data/restaurant.json";
import MenuCard from "../../components/Cards/MenuCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// ----------------------
// Types
// ----------------------
interface RootState {
  search: { value: string };
}

interface MenuItem {
  id: string;
  name: { fa: string; en: string };
  description: { fa: string; en: string };
  price: number;
  image: string;
}

// ----------------------

const categories = restaurantData.restaurant.menu.categories;
const saladCategory = categories.find((cat) => cat.name.en === "Salads");

const toPersianNumber = (num: string | number) =>
  num
    .toString()
    .replace(
      /\d/g,
      (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)]
    );

// ----------------------
//  Search Helpers
// ----------------------
const normalizeText = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[آإأ]/g, "ا")
    .trim();

const matchesSearch = (item: MenuItem, query: string) => {
  if (!query) return true;
  const q = normalizeText(query);

  return (
    normalizeText(item.name.fa).includes(q) ||
    normalizeText(item.name.en).includes(q) ||
    normalizeText(item.description.fa).includes(q) ||
    normalizeText(item.description.en).includes(q)
  );
};
// ----------------------

const Salads: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  const search = useSelector((state: RootState) => state.search.value);

  if (!saladCategory) return null;

  return (
    <Box>
      <HeaderMenu />

      <Container sx={{ mt: 4 }}>
        <Typography
          variant="h3"
          component="h3"
          textAlign="center"
          fontSize={{ xs: 20, sm: 24, md: 28 }}
          sx={(theme) => ({
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
            mb: 4,
          })}
        >
          {saladCategory.name[currentLang]}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 4,
            justifyContent: "center",
            mb: 5,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {saladCategory.items
            .filter((item) => matchesSearch(item, search))
            .map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                price={
                  currentLang === "fa"
                    ? `${toPersianNumber(item.price)} ریال`
                    : `${item.price} Rial`
                }
                image={item.image}
                descriptionEn={item.description.en}
                descriptionFa={item.description.fa}
                nameEn={item.name.en}
                nameFa={item.name.fa}
                lang={currentLang}
              />
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Salads;
