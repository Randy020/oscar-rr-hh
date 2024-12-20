import React from "react";
import { Typography, Button, Box, Container, Grid } from "@mui/material";
import Image from "next/image"; // Si estás usando Next.js para manejo de imágenes

const contactImages = [
  "https://i.pinimg.com/736x/bd/19/a8/bd19a872ebe77ddefdc6cf68fdb2df17.jpg",
  "https://i.pinimg.com/736x/1f/84/ea/1f84ea13b65d149d278ddd582c5c5013.jpg",
  "https://i.pinimg.com/736x/4a/8c/74/4a8c74795e443237bcc61b8f5d9989fe.jpg",
  "https://i.pinimg.com/736x/d9/4f/9b/d94f9b3c7c525cbf47f44b2801fd6015.jpg",
  "https://i.pinimg.com/736x/25/d9/f4/25d9f4963f341ad1e1d11db50f163614.jpg"
];

const ContactUs = () => {
  return (
    <Container>
      <Box sx={{ textAlign: "center", marginBottom: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Estamos aquí para ayudarte
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          Tu conexión con el futuro de los recursos humanos
        </Typography>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          Teléfono: 809-788-2434
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Sección de Dirección */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Image
              src={contactImages[0]}
              alt="Dirección"
              width={400}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Nuestra Dirección
            </Typography>
            <Typography variant="body1">
              Nos encontramos en la Avenida Venezuela, esquina Ozama, No. 61, Plaza Pereyra 1er Nivel, Local 1-03.
              Fácil acceso.
            </Typography>
            
          </Box>
        </Grid>

        {/* Sección de Horarios */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Image
              src={contactImages[1]}
              alt="Horarios de Atención"
              width={400}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Horarios de Atención
            </Typography>
            <Typography variant="body1">
              Lunes a viernes de 8:00 AM a 12:00 PM y de 1:00 PM a 4:00 PM. Si necesitas una cita fuera de este horario, contáctanos.
            </Typography>
            
          </Box>
        </Grid>

        {/* Sección de Accesibilidad */}
        <Grid item xs={12} md={4}>
          <Box sx={{ textAlign: "center" }}>
            <Image
              src={contactImages[2]}
              alt="Accesibilidad"
              width={400}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Accesibilidad
            </Typography>
            <Typography variant="body1">
              Nuestra oficina está diseñada para ser accesible para todos. Contamos con facilidades para personas con movilidad reducida.
            </Typography>
            
          </Box>
        </Grid>
      </Grid>

      {/* Información de contacto */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Envíanos un mensaje
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Estamos aquí para responder tus preguntas
        </Typography>
        <Typography variant="body1">
          Dirección: Avenida Venezuela, esquina Ozama, No. 61, Plaza Pereyra, 1er Nivel, Local 1-03, Santo Domingo Este.
        </Typography>
        <Typography variant="body1">
          Horarios: Lunes a viernes de 8:00 AM a 12:00 PM y de 1:00 PM a 4:00 PM
        </Typography>
        <Typography variant="body1">
          Teléfono: 809-788-2434 | WhatsApp: 849-375-9917
        </Typography>
        <Typography variant="body1">
          Correo electrónico: ofpconsulting@gmail.com
        </Typography>
      </Box>

      {/* Google Map iframe */}
      <Box sx={{ marginTop: 4 }}>
      <iframe
  id="s-map"
  height="250"
  scrolling="no"
  src={`https://www.google.com/maps?q=Avenida%20Venezuela%2C%20esquina%20Ozama%2C%20No.%2061%2C%20Plaza%20Pereyra%2C%201er%20Nivel%2C%20Local%201-03%2C%20Santo%20Domingo%20Este&output=embed`}
  style={{
    pointerEvents: "none",
    height: "310.2px",
    marginTop: "5px",
    marginBottom: "5px",
    width: "100%",
    border: "0"
  }}
></iframe>

      </Box>
    </Container>
  );
};

export default ContactUs;
