import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import HeaderMenu from "../components/Headers/HeaderMenu";
import restaurantData from "../data/restaurant.json";
import MenuCard from "../components/Cards/MenuCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface MenuItem {
  id: string;
  name: { fa: string; en: string };
  description: { fa: string; en: string };
  price: number;
  image: string;
}

interface Category {
  id: string;
  name: { fa: string; en: string };
  items: MenuItem[];
}

const MenuPage: React.FC = () => {
  const search: string = useSelector((state: any) => state.search.value);

  const categories: Category[] = restaurantData.restaurant.menu.categories;

  const { i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  const toPersianNumber = (num: number | string) =>
    num
      .toString()
      .replace(
        /\d/g,
        (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][+d]
      );

  const normalizeText = (text: string) =>
    text
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

  return (
    <Box>
      <HeaderMenu />

      <Container maxWidth="lg">
        {categories.map((category) => (
          <Box key={category.id} sx={{ mb: 6 }}>
            {category.id !== categories[0].id && (
              <Divider
                sx={{ my: 4, borderColor: "divider" }}
                variant="fullWidth"
              />
            )}

            <Typography
              variant="h4"
              textAlign="center"
              sx={(theme) => ({
                mt: 4,
                mb: 2,
                fontSize: { xs: 20, sm: 22, md: 28 },
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
              })}
            >
              {category.name[currentLang]}
            </Typography>

            <Box
              sx={{
                display: "grid",
                gap: 2,
                justifyContent: "center",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(3, 1fr)",
                  lg: "repeat(4, 1fr)",
                },
              }}
            >
              {category.items
                .filter((item) => matchesSearch(item, search))
                .map((item) => (
                  <MenuCard
                    key={item.id}
                    nameFa={item.name.fa}
                    nameEn={item.name.en}
                    descriptionFa={item.description.fa}
                    descriptionEn={item.description.en}
                    price={
                      currentLang === "fa"
                        ? `${toPersianNumber(item.price)} ریال`
                        : `${item.price} Rial`
                    }
                    image={item.image}
                    lang={currentLang}
                    id={item.id}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default MenuPage;
