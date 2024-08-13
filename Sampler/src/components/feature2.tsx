import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import img from "@/components/graphics/Screenshot 2024-08-09 143123.png";
export default function Feature2() {
  return (
    <Card
      sx={{
        maxWidth: 500,
        border: "2px 2px 0px 0px solid black",
        bgcolor: "#BFDBFE",
      }}
    >
      <CardActionArea>
        <CardMedia
          alt="green iguana"
          component="img"
          height="120"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom component="div" variant="h5">
            Special sample marked at weighbridge
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Operational at weighbridge phase, special samplisdkj sjbhfsbh
            jsvdfvsdj hgvh sf jvsjdvfhhsdvfh jhsvhvhshjvghs
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
