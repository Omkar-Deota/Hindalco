import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import img from "@/components/graphics/Screenshot 2024-08-09 152246.png";
export default function Feature3() {
  return (
    <Card sx={{ maxWidth: 500, border: "1px solid gray", bgcolor: "#BFDBFE" }}>
      <CardActionArea>
        <CardMedia
          alt="green iguana"
          component="img"
          height="140"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom component="div" variant="h5">
            Ease out sampling Lab operations
          </Typography>
          <Typography color="text.secondary" variant="body2">
            predicting sample , special samplisdkj sjbhfsbh jsvdfvsdj hgvh sf
            jvsjdvfhhsdvfh jhsvhvhshjvghs
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
