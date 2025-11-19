import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { t } from "i18next";
import { Link } from "react-router-dom";

export default function MenuCard({
  price,
  catName,
  descriptionFa,
  descriptionEn,
  image,
  lang,
  nameFa,
  nameEn,
  id,
}: {
  price: string;
  catName: string;
  nameFa: string;
  nameEn: string;
  descriptionFa: string;
  descriptionEn: string;
  image: string;
  id: string;
  lang: "en" | "fa";
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography>{catName}</Typography>

      <Card sx={{ width: 250, height: "100%" }}>
        <CardMedia
          component="img"
          sx={{ objectFit: "contain" }}
          height="250"
          alt={nameEn}
          image={image}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            bgcolor: "#e2c58a",
            height: "100px",
            color: "#67341b",
          }}
        >
          <Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lang === "fa" ? nameFa : nameEn}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {lang === "fa" ? descriptionFa : descriptionEn}
            </Typography>
          </Box>
          <Typography>
            {t("card.price")}:{price}{" "}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            bgcolor: "#e2c58a",
            mt: "auto",
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              width: "120px",
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
              borderColor: "#67341b",
              height: "36px",
            }}
          >
            <Link
              to={`/menu/${id}`}
              style={{
                textDecoration: "none",
                display: "block",
                color: "#67341b",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {t("button.viewDetails")}
            </Link>
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "120px",
              // color: "black",
              whiteSpace: "nowrap",
              borderColor: "black",
              height: "36px",
              bgcolor: "#51b6a1",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: 13 }}>
              {t("button.addToCart")}
            </Typography>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
