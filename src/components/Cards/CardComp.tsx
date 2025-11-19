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
    <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
      <CardActionArea component={Link} to={`/menu/${id}`}>
        <CardMedia component="img" height="350" image={image} alt={titleEn} />
        <CardContent sx={{ bgcolor: "#e2c58a", color: "#67341b" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            {lang === "fa" ? titleFa : titleEn}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
