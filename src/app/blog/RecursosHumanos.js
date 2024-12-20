'use client'; // Agrega esta directiva al inicio del archivo

import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Card, CardContent, CardMedia, Grid, useTheme, ThemeProvider, createTheme } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig"; // Importa la instancia de Firestore ya configurada

const RecursosHumanos = () => {
  const [mode, setMode] = useState('light'); // Estado para cambiar entre modo claro y oscuro
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "textoBG"));
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();

    // Se obtiene la preferencia del usuario y se aplica el modo oscuro o claro
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, []);

  const customTheme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === 'dark' ? '#121212' : '#f5f5f5',
        paper: mode === 'dark' ? '#1d1d1d' : '#fff',
      },
      text: {
        primary: mode === 'dark' ? '#fff' : '#000',
        secondary: mode === 'dark' ? '#b0b0b0' : '#555',
      },
      primary: {
        main: mode === 'dark' ? '#bb86fc' : '#1976d2',
      },
    },
  });

  if (data.length === 0) {
    return <div>Cargando...</div>; // Mensaje mientras se cargan los datos
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 600, marginBottom: 3 }}>
          Recursos Humanos al Día
        </Typography>
        <Typography variant="h6" align="center" paragraph>
          Tu fuente de información y tendencias en RRHH
        </Typography>
        <Typography variant="subtitle1" align="center" paragraph sx={{ color: 'text.secondary' }}>
          Tendencias Emergentes en Recursos Humanos. Mantente actualizado con las últimas innovaciones en el campo de los RRHH.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3, backgroundColor: 'background.paper' }}>
                {item.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                    sx={{ borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
                  />
                )}
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 500, marginBottom: 2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 2 }}>
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

export default RecursosHumanos;
