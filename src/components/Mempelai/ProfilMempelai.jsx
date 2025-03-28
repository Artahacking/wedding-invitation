import { transition, parentVariants } from "@/animation/transition";
import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import TextMask from "../TextMask";

const fotoVariants = {
  hidden: { scale: 1.3 },
  show: { scale: 1, transition },
  exit: { opacity: 0 },
};

const textVariants = {
  hidden: { opacity: 0, y: "80%", skewY: 10 },
  show: { opacity: 1, y: 0, skewY: 0, transition },
  exit: { opacity: 0 },
};

const ProfilMempelai = ({ mempelai }) => {
  const { namaDepan, namaBelakang, orangTua } = mempelai;
  const namaLengkap = `${namaDepan} ${namaBelakang}`;
  const namaOrangTua = `Bpk. ${orangTua.pria} & Ibu. ${orangTua.wanita}`;

  return (
    <Grid container spacing={0} justifyContent="center" alignItems="center" sx={{ backgroundColor: mempelai.bg }}>
      <Grid
        component={motion.div}
        variants={parentVariants}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: true }}
        item
        md={6}
        xs={12}
        order={{ md: 1, xs: 2 }}
        sx={{
          py: 10,
          minHeight: { md: "100vh", xs: 300 },
          backgroundColor: mempelai.bg,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography
            color="text.secondary"
            variant="h3"
            component="h2"
            sx={{
              mb: 4,
              textAlign: "center",
              fontSize: { xs: "2.5em", sm: "3em", md: "4.5em" },
              fontWeight: 700,
              letterSpacing: "0.05em",
              lineHeight: 1.2,
            }}
          >
            {namaLengkap.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>

          <Typography
            color="text.secondary"
            variant="h6"
            component="div"
            sx={{
              mb: 3,
              textAlign: "center",
              fontSize: { xs: "1em", sm: "1.2em", md: "1.5em" },
              fontWeight: 500,
              letterSpacing: "0.03em",
              lineHeight: 1.4,
            }}
          >
            {orangTua.keterangan.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>

          <Typography
            color="text.secondary"
            variant="h5"
            component="div"
            sx={{
              textAlign: "center",
              fontSize: { xs: "1.2em", sm: "1.4em", md: "1.8em" },
              fontWeight: 600,
              letterSpacing: "0.04em",
              lineHeight: 1.3,
            }}
          >
            {namaOrangTua.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>
        </Container>
      </Grid>

      <Grid
        item
        md={6}
        xs={12}
        order={{ md: 2, xs: 1 }}
        sx={{
          overflow: "hidden",
          height: { md: "100vh", xs: 450 },
        }}
      >
        <Box
          component={motion.img}
          alt={namaLengkap}
          variants={fotoVariants}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: true }}
          src={mempelai.foto}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Grid>
    </Grid>
  );
};

ProfilMempelai.propTypes = {
  mempelai: PropTypes.object.isRequired,
};

export default React.memo(ProfilMempelai);
