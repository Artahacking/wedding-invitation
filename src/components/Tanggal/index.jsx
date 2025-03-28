import { parentVariants, transition } from "@/animation/transition";
import useDB from "@/hooks/useDB";
import { Container, Divider, Grid, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "../TextMask";
import CardTanggal from "./CardTanggal";
import { WhatsApp } from "@mui/icons-material"; // Icon WhatsApp

const textVariants = {
  hidden: { opacity: 0, y: "80%", skewY: 10 },
  show: { opacity: 1, y: 0, skewY: 0, transition },
  exit: { opacity: 0 }
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert("Nomor rekening berhasil disalin!");
};

const Tanggal = () => {
  const textHeader = "Rangkaian Acara Akan Diselenggarakan";
  const { amplopDigital, resepsi } = useDB((db) => db.wedding);

  return (
    <Container sx={{ py: 15 }}>
      <Grid container spacing={5} justifyContent="center">
        <Grid
          item
          xs={12}
          component={motion.div}
          variants={parentVariants}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: true }}
        >
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            {textHeader.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>

          <Typography variant="h2" sx={{ textAlign: "center", my: 3 }}>
            {resepsi.tanggal.split(" ").map((text, key) => (
              <TextMask key={key} variants={textVariants}>
                {text}
              </TextMask>
            ))}
          </Typography>

          <Divider />
        </Grid>

        {/* Kartu Resepsi */}
        <Grid item md={6} xs={12}>
          <CardTanggal
            title="Resepsi Nikah"
            tanggal={resepsi.tanggal}
            jam={resepsi.jam}
            lokasi={resepsi.lokasi}
            alamat={resepsi.alamat}
            link={resepsi.gmaps.link}
          />
        </Grid>

        {/* Kartu Amplop Digital */}
        <Grid item md={6} xs={12}>
          <Box 
            sx={{ 
              textAlign: "center", 
              border: "2px solid #000", 
              borderRadius: "10px", 
              padding: "25px",
              backgroundColor: "#f8f4dc",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >
            {/* Judul */}
            <Typography 
              variant="h4" 
              sx={{ fontWeight: "bold", fontFamily: "'Dancing Script', cursive" }}
            >
              Amplop Digital
            </Typography>

            {/* Logo BRI (Dibuat lebih besar) */}
            <img 
              src="/assets/images/hero/bri.jpg" 
              alt="Bank BRI" 
              width={70} 
              height={70} 
              style={{ borderRadius: "5px" }}
            />

            {/* Informasi Rekening */}
            <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
              Bank: {amplopDigital.namaBank}
            </Typography>
            
            <Typography variant="body1" sx={{ color: "#000" }}>
              Atas Nama: {amplopDigital.namaPemilik}
            </Typography>

            <Typography variant="body1" sx={{ color: "#000" }}>
              Nomor Rekening: <b>{amplopDigital.nomorRekening}</b>
            </Typography>

            {/* Tombol Salin Rekening */}
            <Button 
              variant="contained" 
              sx={{ backgroundColor: "#b8b5a5", color: "#000", "&:hover": { backgroundColor: "#a8a495" } }}
              onClick={() => copyToClipboard(amplopDigital.nomorRekening)}
            >
              Salin Nomor Rekening
            </Button>

            {/* Alamat Pengiriman */}
            <Typography variant="body2" sx={{ color: "#000" }}>
              Alamat Pengiriman: {amplopDigital.alamatPenerima}
            </Typography>

            {/* Tombol Konfirmasi WhatsApp */}
            <Button 
              variant="contained" 
              sx={{ backgroundColor: "#25d366", color: "#fff", "&:hover": { backgroundColor: "#1ebd56" } }}
              startIcon={<WhatsApp />}
             href={`https://wa.me/6281378155390?text=${encodeURIComponent("Happy wedding ya kak, maaf gak bisa datang. Amplopnya digital aja yaa...")}`} 
  target="_blank"
            >
              Konfirmasi ke WhatsApp
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tanggal;
