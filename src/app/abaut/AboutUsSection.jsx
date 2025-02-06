'use client'; // Asegúrate de que esto esté al inicio del archivo

import React, { useEffect, useState } from 'react';
import { getDocs, doc, getDoc, collection } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig"; // Importa la instancia de Firestore ya configurada
import { Typography, Grid, Card, CardContent, CardMedia, Box, ThemeProvider, createTheme } from "@mui/material";

const Conocenos = () => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState("Recursos Humanos"); // Estado para el encabezado
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
        // Obtener el encabezado (apartado0)
        const headerDocRef = doc(db, "textoSN", "apartado0");
        const headerSnap = await getDoc(headerDocRef);
        if (headerSnap.exists()) {
          setHeader(headerSnap.data().encabezado);
        }

        // Obtener el resto de documentos, excluyendo apartado0
        const querySnapshot = await getDocs(collection(db, "textoSN"));
        const documents = querySnapshot.docs
          .filter((doc) => doc.id !== "apartado0") // Excluir apartado0
          .map(doc => ({ id: doc.id, ...doc.data() }));

        setData(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Cargando...</div>; // Mensaje mientras se cargan los datos
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: "40px", backgroundColor: "transparent" }}>
        <Typography variant="h3" color="primary" gutterBottom align="center">
          {header} {/* Se reemplaza el texto fijo con el encabezado de Firestore */}
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                    style={{ whiteSpace: "pre-line" }} // Aquí se respetan los espacios y saltos de línea
                  >
                    {item.contenido}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Conocenos;
