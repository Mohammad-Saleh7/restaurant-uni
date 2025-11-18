import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { t } from "i18next";

export default function MenuCard({
  price,
  catName,
  descriptionFa,
  descriptionEn,
  image,
  lang,
  nameFa,
  nameEn,
}: {
  price: string;
  catName: string;
  nameFa: string;
  nameEn: string;
  descriptionFa: string;
  descriptionEn: string;
  image: string;
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
            gap: 2,
            bgcolor: "#e2c58a",
            height: "150px",
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
      </Card>
    </Box>
  );
}
