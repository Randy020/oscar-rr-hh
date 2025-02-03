import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import { Box, Typography, Button } from "@mui/material";
import { auth, signInWithGoogleEmpleador } from "@/lib/firebaseConfig";

const Publicar = () => {
  // Hook para saber si hay usuario autenticado
  const [user] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);

  // Si el usuario no está logueado, se evita la redirección y se abre el modal
  const handleClick = (e) => {
    if (!user) {
      e.preventDefault();
      setOpenModal(true);
    }
  };

  // Función para iniciar sesión como empleador (adaptada del código que compartiste)
  const handleSignInAsEmpleador = async () => {
    const result = await signInWithGoogleEmpleador();
    // Si el resultado indica que no es un empleador, se puede abrir un formulario de registro
    // Aquí puedes adaptar la lógica según tus necesidades (por ejemplo, abrir otro modal con el formulario)
    if (result === "no-empleador") {
      // Aquí podrías abrir un modal de registro o mostrar un mensaje de error
      console.log("El usuario no es un empleador. Mostrar formulario de registro.");
    } else {
      // Si la autenticación fue exitosa, cerrar el modal
      setOpenModal(false);
    }
  };

  return (
    <div className="container">
      {/* 
        Se usa Link para la navegación en caso de que el usuario ya esté autenticado.
        Si no está logueado, la función handleClick evita la redirección y muestra el modal.
      */}
      <Link href="/vender" passHref>
        <button className="action-button" onClick={handleClick}>
          <span className="action-text">Publicar</span>
          <span className="action-icon">
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
            <span className="action-span">+</span>
          </span>
        </button>
      </Link>

      {/* Modal para iniciar sesión (se muestra solo si el usuario no está autenticado) */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
          <Typography variant="h6" component="h2" className="mb-4">
            Inicia sesión para continuar
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignInAsEmpleador}
          >
            Iniciar sesión 
          </Button>--
          <Button
            variant="contained"
            color="primary"
            onClick={handleSignInAsEmpleador}
          >
            crear cuenta
          </Button>
          {/* 
            Puedes agregar aquí otros botones o incluso un enlace para iniciar sesión de forma alternativa.
            Por ejemplo, un enlace para iniciar sesión con otra cuenta o mostrar un formulario de registro.
          */}
        </Box>
      </Modal>
    </div>
  );
};

export default Publicar;
