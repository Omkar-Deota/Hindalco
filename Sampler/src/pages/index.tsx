import { Container, Grid, Typography, Paper } from "@mui/material";
import Fade from "@mui/material/Fade";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Feature1 from "@/components/feature1";
import Feature2 from "@/components/feature2";
import Feature3 from "@/components/feature3";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default function IndexPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-12 w-full bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 text-white">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="inline-block max-w-lg text-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={title()}>Hindalco&nbsp;</h1>
            <h1 className={title()}>PRATICHAYAN&nbsp;</h1>
            <br />
            <h1 className={title()}>
              Easier & Reliable Special Sampling of Coal
            </h1>
            <h3 className={subtitle({ class: "mt-4" })}>
              || Enhancing Accuracy Day In and Day Out ||
            </h3>
          </motion.div>
        </section>

        <Container className="py-10" maxWidth="md">
          <Fade in={true} timeout={1000}>
            <Typography paragraph variant="body1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
              minima vitae sunt dicta rem quia sit sequi. Numquam, dolorum
              placeat! Explicabo qui suscipit reiciendis nesciunt quisquam iste
              enim tempora temporibus! Officiis, doloribus. Velit eaque
              consequuntur corrupti maxime? Modi nulla assumenda ut perspiciatis
              quam ipsam minus consequuntur molestiae reprehenderit suscipit ex
              dolorem, pariatur corrupti. Aut, dignissimos ullam eos doloribus
              at ab! Fugiat quaerat dolore, animi commodi ipsa nostrum. Ipsa
              deleniti quo quis modi! Culpa in ratione eveniet impedit labore.
              Voluptatum quisquam et ratione impedit, animi nobis iure a
              corrupti. Quia, vero. Quis, harum neque? Quidem minima sit
              laudantium deleniti aut nobis quos ipsa magni quae cum, velit amet
              adipisci maiores. Voluptatem libero expedita, atque cumque quasi
              laborum eligendi alias soluta dicta! Hic pariatur cumque cum nihil
              et deserunt unde labore, ex inventore, consequatur explicabo sed.
              Error commodi tempore doloribus enim, sapiente praesentium
              deserunt incidunt voluptas porro? Ratione impedit quod sunt
              placeat! Voluptatibus id cumque corrupti vero dignissimos? Amet
              quidem neque laboriosam corporis temporibus beatae sunt saepe.
              Unde perspiciatis cupiditate id! Error aspernatur dolore ducimus
              officia facilis quae fugiat fugit consectetur dolorem! In ipsa
              assumenda facere doloremque nostrum corrupti inventore
              perferendis quas dolore minima delectus repellat laboriosam nobis
              voluptates maiores et eius commodi eveniet consectetur, sint eaque
              quo veritatis culpa. Quidem, officia! Eveniet, ullam
              exercitationem sequi molestias odit unde velit numquam
              consectetur. Accusamus perspiciatis officia fugit, officiis
              numquam nulla at id, laudantium doloribus harum, consequuntur
              nesciunt blanditiis! Voluptates dignissimos provident alias eum.
              Natus vel error delectus consequuntur voluptatibus, aliquam
              commodi, velit, dolorem labore corporis mollitia excepturi optio
              tempore perspiciatis quia? Excepturi repudiandae unde dolor
              dolorem vitae accusamus dolores ex, asperiores quos quibusdam?
              Iusto, error unde? Libero distinctio voluptas non dolores maiores
              assumenda perspiciatis rem officiis impedit labore nobis pariatur
              hic facere sit placeat, asperiores corrupti eligendi similique,
              cupiditate sint architecto, excepturi omnis!
            </Typography>
          </Fade>
        </Container>

        <Container className="py-10" maxWidth="lg">
          <Feature1 />
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item md={6} xs={12}>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: darkTheme.palette.background.paper,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <Feature2 />
                </Paper>
              </motion.div>
            </Grid>
            <Grid item md={6} xs={12}>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    backgroundColor: darkTheme.palette.background.paper,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <Feature3 />
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </DefaultLayout>
    </ThemeProvider>
  );
}
