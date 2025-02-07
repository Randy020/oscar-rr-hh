"use client";
import React, { useState } from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import VideoWithMuteToggle from "@/components/Tables/VideoWithMuteButton";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { signInWithGoogleEmpleador } from "@/lib/firebaseConfig"; // Función para iniciar sesión como empleador
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import Link from "next/link";

const ECommerce: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [user] = useAuthState(auth);

  // Función para manejar el clic en "aquí"
  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    if (user) {
      // Si está logueado, redirige a la ruta x
      window.location.href = "/vender";
    } else {
      // Si no, abre el modal para iniciar sesión
      setModalOpen(true);
    }
  };

  // Función para iniciar sesión como empleador
  const handleSignIn = async () => {
    const result = await signInWithGoogleEmpleador();
    // Si la autenticación es correcta, se cierra el modal y se redirige
    if (result !== "no-empleador") {
      setModalOpen(false);
      window.location.href = "/vender";
    } else {
      // Puedes mostrar un mensaje o lógica adicional si el usuario no es un empleador
      console.log("El usuario no es un empleador");
    }
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
        <div className="flex flex-col items-center justify-center">
            <Image
              src="/img/7cf5e7d6-4af5-403a-8154-a983446f464d-removebg-preview.png"
              alt="Descripción del GIF"
              width={650}
              height={150}
              priority
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/img/hacia bajo.gif"
              alt="Descripción del GIF"
              width={150}
              height={100}
              priority
              className="rotate-90" // Clase de Tailwind CSS para rotar la imagen
            />
          </div>

          <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mt-8 mb-4">
            <span className="block md:hidden">
              Coloca{" "}
              <span
                onClick={handleOpenModal}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                aquí
              </span>{" "}
              tu mejor Oferta y vende a miles de personas
            </span>
            <span className="hidden md:block">
              vende lo que quieras{" "}
              <span
                onClick={handleOpenModal}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                aquí
              </span>{" "}
              a miles de personas
            </span>
          </h1>

          <VideoWithMuteToggle />

          {/* Muestra el ChatCard solo en móvil */}
          <div className="block md:hidden mb-4">
            <ChatCard />
          </div>

          {/* Tabla visible siempre */}
          <TableOne />
        </div>

        {/* ChatCard para versión de escritorio */}
        <div className="relative">
          <div className="hidden md:block absolute z-10">
            <ChatCard />
          </div>
        </div>
      </div>

      {/* Modal para iniciar sesión */}
      {/* Modal para iniciar sesión */}
<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "white",
      p: 4,
      borderRadius: 2,
      textAlign: "center",
    }}
  >
    <Typography variant="h6" component="h2">
      Para continuar inicia sesión
    </Typography>
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      onClick={handleSignIn}
    >
      Iniciar sesión
    </Button>
       --
    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      onClick={handleSignIn}
    >
       crear cuenta
    </Button>
    {/* Botón para cerrar el modal */}
    <Button
      variant="outlined"
      color="secondary"
      sx={{ mt: 2 }}
      onClick={() => setModalOpen(false)}
    >
      Cerrar
    </Button>
  </Box>
</Modal>
    </>
  );
};

export default ECommerce;
