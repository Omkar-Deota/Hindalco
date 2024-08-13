import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import img from "@/components/graphics/coal-handling-plant.jpg";
export default function Feature1() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <motion.div
        className="flex w-full bg-blue-200 text-black p-6 rounded-md shadow-md"
        initial={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 50, duration: 1.0 }}
        viewport={{ once: true }}
        whileInView={{ x: 0 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              <img
                alt="Plant"
                src={img}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <h2 className="text-2xl font-bold mb-4">Description Title</h2>
            <p style={{ fontSize: "1rem" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              nostrum eveniet corrupti! Sint, temporibus maxime ullam rem nisi,
              voluptatem tempore aperiam non illo voluptates obcaecati omnis nam
              officiis quae excepturi? Autem consequuntur dolor id culpa dolores
              sed reiciendis dignissimos possimus non! Assumenda nesciunt rem
              ipsum quisquam, perferendis excepturi omnis facere reiciendis
              minus debitis exercitationem eligendi modi, nemo nostrum nobis
              deleniti?.
            </p>
          </Grid>
        </Grid>
      </motion.div>
    </section>
  );
}
