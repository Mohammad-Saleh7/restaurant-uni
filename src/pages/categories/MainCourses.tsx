import { Box, Container, Typography } from "@mui/material";
import React from "react";
import HeaderMenu from "../../components/Headers/HeaderMenu";
import restaurantData from "../../data/restaurant.json";
import MenuCard from "../../components/Cards/MenuCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

// ---------- Types ----------
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
// ----------------------------

const categories = restaurantData.restaurant.menu.categories;
const mainCourseCategory = categories.find(
  (cat) => cat.name.en === "Main Courses"
);

const toPersianNumber = (num: string | number) =>
  num
    .toString()
    .replace(
      /\d/g,
      (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)]
    );

// ----------------------
// 🔍 تابع نرمال‌سازی و سرچ
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

const MainCourses: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  const search = useSelector((state: RootState) => state.search.value);

  if (!mainCourseCategory) return null;

  return (
    <div>
      <HeaderMenu />
      <Container sx={{ mb: 5, mt: 4 }}>
        <Typography
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            color:
              theme.palette.mode === "dark"
                ? "text.primary"
                : "text.lightPrimary",
          })}
          variant="h3"
          component="h3"
          fontSize={{ xs: 20, sm: 24, md: 28 }}
          textAlign="center"
          mb={5}
        >
          {mainCourseCategory.name[currentLang]}
        </Typography>

        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            gap: 4,
            mb: 5,
            gridTemplateColumns: {
              xs: "repeat(1, minmax(250px, 1fr))",
              sm: "repeat(2, minmax(250px, 1fr))",
              md: "repeat(3, minmax(250px, 1fr))",
              lg: "repeat(4, minmax(250px, 1fr))",
            },
          }}
        >
          {mainCourseCategory.items
            .filter((item: MenuItem) => matchesSearch(item, search))
            .map((item) => (
              <MenuCard
                key={item.id}
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
                id={item.id}
              />
            ))}
        </Box>
      </Container>
    </div>
  );
};

export default MainCourses;
