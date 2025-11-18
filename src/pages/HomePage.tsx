import React from "react";
import HeaderHome from "../components/HeaderHome";
import { Box, Button, ButtonGroup, Container, Typography } from "@mui/material";
import CardComp from "../components/CardComp";
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
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            marginBottom: "80px",
          }}
        >
          <Typography variant="h2" component={"h2"} color="#67341b">
            {t("about.title")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              component={"p"}
              fontSize={20}
              color="#67341b"
            >
              {t("about.text")}
            </Typography>
            <Typography
              variant="body1"
              component={"p"}
              fontSize={20}
              color="#67341b"
            >
              {t("about.text2")}
            </Typography>
          </Box>
          <Typography variant="h3" component={"h3"} color="#67341b">
            {t("popular.title")}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          {popularDishes.map((item) => (
            <CardComp
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
            mt: 8,
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            sx={{ display: "flex", justifyContent: "center" }}
            variant="h3"
            component={"h3"}
            color="#67341b"
          >
            {t("categories.title")}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 10 }}>
            <ButtonHome lang={currentLang} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
