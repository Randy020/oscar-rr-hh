'use client'; // Asegúrate de que esto esté al inicio del archivo

import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig"; // Importa la instancia de Firestore ya configurada
import { Typography, Grid, Card, CardContent, CardMedia, Button, Box, useTheme, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Conocenos = () => {
  const [data, setData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#90caf9" : "#1976d2",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#1d1d1d" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#ffffff" : "#000000",
        secondary: darkMode ? "#b0bec5" : "#757575",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "textoSN")); // Obtener todos los documentos de la colección "texto"
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(), // Obtén los datos de cada documento
        }));
        setData(documents); // Guarda los documentos en el estado
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  if (data.length === 0) {
    return <div>Cargando...</div>; // Mensaje mientras se cargan los datos
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "40px", backgroundColor: "transparent" }}>
        <Typography variant="h3" color="primary" gutterBottom align="center">
          Recursos Humanos
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph align="center">
          Expertos en la gestión de talento humano
        </Typography>

        <Grid container spacing={4} justifyContent="center" sx={{ marginTop: "30px" }}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    sx={{
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                      objectFit: "cover",
                    }}
                  />
                )}
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.contenido}
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ marginTop: "60px", textAlign: "center" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Transformando el talento humano
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Un equipo comprometido con la excelencia en cada proyecto.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Conocenos;
