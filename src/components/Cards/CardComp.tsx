import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  titleEn: string;
  titleFa: string;
  lang: "en" | "fa";
  id: string;
}

export default function CardComp({
  image,
  titleEn,
  titleFa,
  lang,
  id,
}: CardProps) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 0,
        width: "100%",
      }}
    >
      <CardActionArea component={Link} to={`/menu/${id}`}>
        <CardMedia
          component="img"
          image={image}
          alt={titleEn}
          sx={{
            width: "100%",
            height: { xs: 220, sm: 260, md: 320, lg: 350 },
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />

        <CardContent
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === "dark"
                ? "background.darkPaper"
                : "background.default",
          })}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              color:
                theme.palette.mode === "dark"
                  ? "text.primary"
                  : "text.lightPrimary",
              textAlign: "center",
            })}
          >
            {lang === "fa" ? titleFa : titleEn}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
