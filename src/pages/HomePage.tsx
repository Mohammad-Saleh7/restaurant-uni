import React from "react";
import HeaderHome from "../components/Headers/HeaderHome";
import { Box, Container, Typography } from "@mui/material";
import CardComp from "../components/Cards/CardComp";
import restaurantData from "../data/restaurant.json";
import ButtonHome from "../components/ButtonHome";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const categories = restaurantData.restaurant.menu.categories;

  //what is flatMap?????
  const allItems = categories.flatMap((el) => el.items);

  const popularIds = ["item_margherita", "item_caesar", "item_espresso"];

  const popularDishes = allItems.filter((items) =>
    popularIds.includes(items.id)
  );

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  return (
    <Box>
      <HeaderHome />
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 2, sm: 3, md: 4 },
            marginBottom: { xs: "40px", md: "80px" },
          }}
        >
          <Typography
            variant="h2"
            component={"h2"}
            color="#67341b"
            fontSize={{ xs: 28, sm: 36, md: 48 }}
            textAlign="center"
          >
            {t("about.title")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              width: { xs: "100%", sm: "80%", md: "60%" },
            }}
          >
            <Typography
              variant="body1"
              component={"p"}
              fontSize={{ xs: 16, sm: 18, md: 20 }}
              color="#67341b"
              textAlign="center"
            >
              {t("about.text")}
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              fontSize={{ xs: 16, sm: 18, md: 20 }}
              color="#67341b"
              textAlign="center"
            >
              {t("about.text2")}
            </Typography>
          </Box>
          <Typography
            variant="h3"
            component={"h3"}
            color="#67341b"
            fontSize={{ xs: 22, sm: 28, md: 32 }}
            textAlign="center"
          >
            {t("popular.title")}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2, md: 3 },
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {popularDishes.map((item) => (
            <CardComp
              id={item.id}
              key={item.id}
              image={item.image}
              titleEn={item.name.en}
              titleFa={item.name.fa}
              lang={currentLang}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            mt: { xs: 4, md: 8 },
            flexDirection: "column",
            gap: { xs: 2, md: 3 },
          }}
        >
          <Typography
            sx={{ display: "flex", justifyContent: "center" }}
            variant="h3"
            component={"h3"}
            color="#67341b"
            fontSize={{ xs: 20, sm: 24, md: 28 }}
            textAlign="center"
          >
            {t("categories.title")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 4, md: 10 },
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
