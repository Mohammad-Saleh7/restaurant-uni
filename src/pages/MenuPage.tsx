import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";
import HeaderMenu from "../components/Headers/HeaderMenu";
import restaurantData from "../data/restaurant.json";
import MenuCard from "../components/Cards/MenuCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const MenuPage: React.FC = () => {
  const categories = restaurantData.restaurant.menu.categories;
  const allItems = categories.flatMap((el) => el.items);

  const { t, i18n } = useTranslation();
  const currentLang = i18n.language === "fa" ? "fa" : "en";

  function toPersianNumber(num: string | number) {
    return num
      .toString()
      .replace(
        /\d/g,
        (d) => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][parseInt(d)]
      );
  }

  return (
    <Box>
      <HeaderMenu />
      <Container>
        <Box>
          {categories.map((category) => (
            <Box key={category.id} sx={{ mb: 4 }}>
              <Divider />
              <Typography
                variant="h3"
                component={"h3"}
                color="#67341b"
                fontSize={{ xs: 20, sm: 24, md: 28 }}
                textAlign="center"
                sx={{ display: "flex", justifyContent: "center", mb: 1, mt: 4 }}
              >
                {category.name[currentLang]}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {category.items.map((item) => (
                  <MenuCard
                    key={item.id}
                    nameFa={item.name.fa}
                    nameEn={item.name.en}
                    descriptionFa={item.description.fa}
                    descriptionEn={item.description.en}
                    // catName={category.name[currentLang]}
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
        </Box>
      </Container>
    </Box>
  );
};

export default MenuPage;
