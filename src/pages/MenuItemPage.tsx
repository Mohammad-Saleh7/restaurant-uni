import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import restaurantData from "../data/restaurant.json";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import HeaderMenu from "../components/Headers/HeaderMenu";
import { t } from "i18next";
import MenuCard from "../components/Cards/MenuCard";

const allItems = restaurantData.restaurant.menu.categories.flatMap(
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

  if (!id || !item || !item.id) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component={"h1"} color="error">
          item not found!!
        </Typography>
      </Box>
    );
  }

  const similarItems = category
    ? category.items.filter((it) => it.id !== item.id).slice(0, 4)
    : [];

  return (
    <Box>
      <HeaderMenu />
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.2fr 1fr" },
          }}
          mb={8}
        >
          <Box
            component={"img"}
            src={item.image}
            alt={item.name[currentLang]}
            width={450}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              component={"h5"}
              sx={{ fontWeight: "bold", fontSize: 30 }}
            >
              {item.description[currentLang]}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: 20 }}
            >
              {category ? category.name[currentLang] : ""}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", fontSize: 20 }}
            >
              {item.description[currentLang]}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: 20 }}>
              {item.price}$
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="contained"
                sx={{ width: "fit-content", bgcolor: "#51b6a1" }}
              >
                <Typography>Add To Cart</Typography>
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "fit-content" }}
                onClick={() => window.history.back()}
              >
                <Typography>Back</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5" component={"h5"} sx={{ fontWeight: "bold" }}>
            similar items
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
              gap: 2,
            }}
          >
            {similarItems.map((similar) => (
              <MenuCard
                key={similar.id}
                nameFa={similar.name.fa}
                nameEn={similar.name.en}
                descriptionFa={similar.description.fa}
                descriptionEn={similar.description.en}
                price={`${similar.price}$`}
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

// <ItemCard
//   key={item.id}
//   nameFa={item.name.fa}
//   nameEn={item.name.en}
//   descriptionFa={item.description.fa}
//   descriptionEn={item.description.en}
//   price={`${item.price}$`}
//   image={item.image}
//   lang={currentLang}
//   id={item.id}
//   catName={category ? category.name[currentLang] : ""}
// />
