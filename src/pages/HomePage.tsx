import React, { useMemo } from "react";
import HeaderHome from "../components/Headers/HeaderHome";
import { Box, Container, Divider, Typography, Stack } from "@mui/material";
import CardComp from "../components/Cards/CardComp";
import restaurantData from "../data/restaurant.json";
import ButtonHome from "../components/ButtonHome";
import { useTranslation } from "react-i18next";

/* ---------- Types ---------- */
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
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "fa" ? "fa" : "en";

  const categories: Category[] = restaurantData.restaurant.menu.categories;

  const allItems = useMemo(
    () => categories.flatMap((c) => c.items),
    [categories]
  );

  const popularIds = ["item_margherita", "item_caesar", "item_espresso"];

  const popularDishes = useMemo(
    () => allItems.filter((i) => popularIds.includes(i.id)),
    [allItems]
  );

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* ---------- HERO ---------- */}
      <HeaderHome />

      {/* ---------- CONTENT ---------- */}
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 1.5, sm: 2.5, md: 4 },
          pb: { xs: 6, md: 10 },
        }}
      >
        {/* ---------- ABOUT ---------- */}
        <Stack
          spacing={{ xs: 2.5, md: 4 }}
          alignItems="center"
          textAlign="center"
          mt={{ xs: 3, md: 5 }}
          mb={{ xs: 5, md: 8 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: 26, sm: 34, md: 44 },
              fontWeight: 900,
            }}
          >
            {t("about.title")}
          </Typography>

          <Box
            sx={{
              maxWidth: 720,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 15, sm: 17, md: 19 },
                lineHeight: 1.8,
              }}
            >
              {t("about.text")}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 15, sm: 17, md: 19 },
                lineHeight: 1.8,
              }}
            >
              {t("about.text2")}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: { xs: 4, md: 6 } }} />

        {/* ---------- POPULAR ---------- */}
        <Stack
          spacing={{ xs: 2.5, md: 4 }}
          alignItems="center"
          mb={{ xs: 6, md: 9 }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 20, sm: 26, md: 32 },
              fontWeight: 900,
            }}
          >
            {t("popular.title")}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 2.5, md: 3 },
              width: "100%",
              justifyItems: "center",
            }}
          >
            {popularDishes.map((item) => (
              <CardComp
                key={item.id}
                id={item.id}
                image={item.image}
                titleEn={item.name.en}
                titleFa={item.name.fa}
                lang={lang}
              />
            ))}
          </Box>
        </Stack>

        <Divider sx={{ mb: { xs: 4, md: 6 } }} />

        {/* ---------- CATEGORIES ---------- */}
        <Stack spacing={{ xs: 2.5, md: 4 }} alignItems="center">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 20, sm: 24, md: 30 },
              fontWeight: 900,
            }}
          >
            {t("categories.title")}
          </Typography>

          <Box sx={{ mt: 1 }}>
            <ButtonHome lang={lang} />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
