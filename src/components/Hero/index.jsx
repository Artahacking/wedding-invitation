import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { transition, parentVariants } from "@/animation/transition";
import { motion } from "framer-motion";
import useDB from "@/hooks/useDB";
import TextMask from "../TextMask";
import { useLocation } from "react-router-dom";

/**
 * Animasi gambar
 */
const imageVariants = {
  hidden: { scale: 2, opacity: 0 },
  show: { scale: 1, opacity: 1, transition },
  exit: { opacity: 0 },
};

/**
 * Animasi teks
 */
const textVariants = {
  hidden: { opacity: 0, y: "80%", skewY: 10 },
  show: { opacity: 1, y: 0, skewY: 0, transition },
  exit: { opacity: 0 },
};

/**
 * Animasi garis pembatas
 */
const dividerVariants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, originX: 0, transition },
  exit: { opacity: 0 },
};

/**
 * Fungsi untuk mengambil parameter dari URL
 */
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

/**
 * Komponen Hero
 */
const Hero = () => {
  const { hero, wedding } = useDB((db) => db);
  const searchParams = useQueryParams();

  let namaUndangan = searchParams.getAll("nama").join(" & ");
  if (!namaUndangan || namaUndangan.trim() === "") {
    namaUndangan = "Tamu Undangan";
  }

  const mempelaiPria = wedding.mempelai.pria.namaDepan;
  const mempelaiWanita = wedding.mempelai.wanita.namaPanggilan;
  const mempelai = `${mempelaiPria} & ${mempelaiWanita}`;
  const undangan = "Ngunduh Mantu";

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
    >
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          component={motion.img}
          alt="Hero background"
          variants={imageVariants}
          src={hero.banner}
          sx={{
            objectFit: "cover",
            objectPosition: "bottom center",
            width: "100%",
            height: "100vh",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: ({ palette }) => {
              return `linear-gradient(to bottom, transparent, ${palette.background.default})`;
            },
          }}
        >
          <Container>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: { md: 30, xs: 18 },
                textShadow: "1px 1px rgba(60, 42, 33, 0.6)",
                marginBottom: "10px",
              }}
            >
              {`Kepada Bapak/Ibu/Saudara/i ${namaUndangan}`}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: { md: 25, xs: 16 },
                textShadow: "1px 1px rgba(60, 42, 33, 0.6)",
                marginBottom: "20px",
              }}
            >
              Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.
            </Typography>

            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontSize: { md: 40, xs: 25 },
                textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
                marginBottom: "10px",
              }}
            >
              {undangan.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>

            {/* Membuat nama pengantin dalam satu baris di HP */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "nowrap",
                gap: 1,
              }}
            >
              {mempelai.split(" ").map((text, key) => (
                <Typography
                  key={key}
                  variant="h3"
                  sx={{
                    fontSize: { md: "6em", xs: "3em" },
                    textShadow: "3px 3px rgba(60, 42, 33, 0.6)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <TextMask variants={textVariants}>{text}</TextMask>
                </Typography>
              ))}
            </Box>

            <Box
              component={motion.div}
              variants={dividerVariants}
              sx={{
                borderBottom: 2,
                borderColor: "divider",
                width: "80%",
                margin: "10px auto",
              }}
            />

            <Typography
              variant="h5"
              component="p"
              sx={{
                mt: 2,
                textAlign: "center",
                fontSize: { md: "2.5em", xs: "1.5em" },
                textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
              }}
            >
              {wedding.resepsi.tanggal.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Hero;
