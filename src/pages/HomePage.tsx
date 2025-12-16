// src/pages/HomePage.tsx
import React from "react";
import HeaderHome from "../components/Headers/HeaderHome";
import { Box, Container, Typography } from "@mui/material";
import CardComp from "../components/Cards/CardComp";
import restaurantData from "../data/restaurant.json";
import ButtonHome from "../components/ButtonHome";
import { useTranslation } from "react-i18next";

import AIRecommendations from "../components/AIRecommendations";
import type { MenuCategory } from "../utils/aiTaste";

interface Item {
  id: string;
  name: { fa: string; en: string };
  image: string;
}
interface Category {
  id: string;
  name: { fa: string; en: string };
  items: Item[];
}

const HomePage: React.FC = () => {
  const categories: Category[] = restaurantData.restaurant.menu.categories;
  const aiCategories = restaurantData.restaurant.menu
    .categories as unknown as MenuCategory[];

  const allItems: Item[] = categories.flatMap((el) => el.items);

  const popularIds = ["item_margherita", "item_caesar", "item_espresso"];
  const popularDishes = allItems.filter((item) => popularIds.includes(item.id));

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  return (
    <Box>
      <HeaderHome />

      <Container maxWidth="lg" sx={{ px: { xs: 1.5, sm: 2, md: 4 }, pb: 8 }}>
        {/* --- ABOUT SECTION --- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 4, md: 8 },
            mt: 2,
          }}
        >
          <Typography
            variant="h2"
            fontSize={{ xs: 26, sm: 32, md: 42 }}
            textAlign="center"
            sx={(theme) => ({
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              fontWeight: 1000,
            })}
          >
            {t("about.title")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 1.5, sm: 2 },
              width: { xs: "100%", sm: "80%", md: "60%" },
            }}
          >
            <Typography
              fontSize={{ xs: 15, sm: 17, md: 19 }}
              textAlign="center"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
                opacity: 0.9,
              })}
            >
              {t("about.text")}
            </Typography>

            <Typography
              fontSize={{ xs: 15, sm: 17, md: 19 }}
              textAlign="center"
              sx={(theme) => ({
                color:
                  theme.palette.mode === "dark"
                    ? "text.primary"
                    : "text.lightPrimary",
                opacity: 0.9,
              })}
            >
              {t("about.text2")}
            </Typography>
          </Box>

          <Typography
            variant="h3"
            fontSize={{ xs: 20, sm: 26, md: 32 }}
            textAlign="center"
            sx={(theme) => ({
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              fontWeight: 1000,
            })}
          >
            {t("popular.title")}
          </Typography>
        </Box>

        {/* --- POPULAR ITEMS --- */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1.5, sm: 2, md: 3 },
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {popularDishes.map((item) => (
            <CardComp
              key={item.id}
              id={item.id}
              image={item.image}
              titleEn={item.name.en}
              titleFa={item.name.fa}
              lang={currentLang}
            />
          ))}
        </Box>

        {/* ✅ AI "For You" */}
        <AIRecommendations
          categories={aiCategories}
          currentLang={currentLang}
          excludeIds={popularIds}
          title={t("ai.forYou")}
        />

        {/* --- CATEGORIES SECTION --- */}
        <Box
          sx={{
            display: "flex",
            mt: { xs: 5, md: 8 },
            flexDirection: "column",
            gap: { xs: 2, md: 3 },
          }}
        >
          <Typography
            variant="h3"
            fontSize={{ xs: 20, sm: 24, md: 28 }}
            textAlign="center"
            sx={(theme) => ({
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              fontWeight: 1000,
            })}
          >
            {t("categories.title")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 4, md: 8 },
            }}
          >
            <ButtonHome lang={currentLang} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
