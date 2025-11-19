import React from "react";
import HeaderMenu from "../components/Headers/HeaderMenu";
import { Box, Container, Typography } from "@mui/material";
import restaurantData from "../data/restaurant.json";
import MenuCard from "../components/Cards/MenuCard";
import { useTranslation } from "react-i18next";

const categories = restaurantData.restaurant.menu.categories;
const saladCategory = categories.find((cat) => cat.name.en === "Salads");

const Salads: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";
  if (!saladCategory) return null;
  return (
    <div>
      <HeaderMenu />
      <Container>
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="h3"
          component={"h3"}
          color="#67341b"
          fontSize={{ xs: 20, sm: 24, md: 28 }}
          textAlign="center"
          mb={5}
        >
          {saladCategory.name[currentLang]}
        </Typography>
        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
            gridTemplateColumns: "repeat(4, minmax(250px, 1fr))",
            mb: 5,
          }}
        >
          {saladCategory.items.map((item) => (
            <MenuCard
              id={item.id}
              key={item.id}
              price={`${item.price}$`}
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
    </div>
  );
};

export default Salads;
