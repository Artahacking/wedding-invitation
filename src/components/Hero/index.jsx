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
  hidden: {
    scale: 2,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Text variant
 */
const textVariants = {
  hidden: {
    opacity: 0,
    y: "80%",
    skewY: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Text variant
 */
const dividerVariants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  show: {
    scaleX: 1,
    originX: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Fungsi untuk mengambil parameter dari URL
 */
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

/**
 * Hero element
 *
 * @returns React.ReactElement
 */
const Hero = () => {
  const { hero, wedding } = useDB((db) => db);
  const searchParams = useQueryParams();

  // Ambil semua parameter "nama" dari URL dan gabungkan
  let namaUndangan = searchParams.getAll("nama").join(" & ");

  // Jika hanya ada satu nama atau tidak ada sama sekali, gunakan default
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
              variant="h4"
              sx={{
                textAlign: "center",
                fontSize: {
                  md: 35,
                  xs: 25,
                },
                textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
                marginBottom: "10px",
              }}
            >
              {`Kepada Bapak/Ibu/Saudara/i ${namaUndangan}`}
            </Typography>

            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontSize: {
                  md: 30,
                  xs: 20,
                },
                textShadow: "2px 2px rgba(60, 42, 33, 0.6)",
                marginBottom: "20px",
              }}
            >
              Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.
            </Typography>

            <Typography
              variant="h2"
              sx={{
                textAlign: {
                  md: "left",
                  xs: "center",
                },
                fontSize: {
                  md: 70,
                  xs: 45,
                },
                textShadow: "3px 3px rgba(60, 42, 33, 0.6)",
              }}
            >
              {undangan.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                textAlign: {
                  md: "left",
                  xs: "center",
                },
                fontSize: {
                  md: "10em",
                  xs: "6em",
                },
                textShadow: "5px 5px rgba(60, 42, 33, 0.6)",
              }}
            >
              {mempelai.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>

            <Box
              component={motion.div}
              variants={dividerVariants}
              sx={{ borderBottom: 3, borderColor: "divider" }}
            />

            <Typography
              variant="h3"
              component="p"
              sx={{
                mt: 2,
                textAlign: {
                  md: "left",
                  xs: "center",
                },
                fontSize: {
                  md: "3em",
                  xs: "2em",
                },
                textShadow: "3px 3px rgba(60, 42, 33, 0.6)",
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
