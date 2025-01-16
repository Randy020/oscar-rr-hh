"use client";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { getAuth } from "firebase/auth"; // Importa Firebase Auth
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Importa Firestore
import CheckPaymentButton from "./Admin";
import {DisplayImages, DisplayImagesP, DisplayImagesMovil} from "./publicidadUI"
import { useEffect } from 'react';


// Obtén la referencia a la base de datos de Firestore
const db = getFirestore();

const ChatCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = getAuth(); // Obtén la referencia de autenticación de Firebase

  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es móvil

  // Usamos useEffect para detectar el tamaño de la ventana
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta según el tamaño deseado para móvil
    };

    checkMobile(); // Verifica el tamaño al cargar
    window.addEventListener('resize', checkMobile); // Verifica cuando cambie el tamaño de la ventana

    return () => window.removeEventListener('resize', checkMobile); // Limpia el evento
  }, []);

  // Función para abrir y cerrar el modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Función para guardar el pago en Firestore
  const savePaymentToFirestore = async (paymentType: string) => {
    try {
      // Obtener el UID del usuario logeado
      const uid = auth.currentUser?.uid;
      
      if (!uid) {
        alert("Usuario no autenticado");
        return;
      }

      // Obtener la fecha actual
      const date = new Date();

      // Guardar el pago en la colección de Firestore
      await addDoc(collection(db, "PagoPublicidad"), {
        uid: uid,
        paymentType: paymentType,
        date: date,
      });
      console.log("Pago guardado exitosamente en Firestore");
    } catch (error) {
      console.error("Error guardando el pago en Firestore", error);
    }
  };
  

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
  <h4 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
    | Enterate. |
  </h4>

  {/* Botón con el nuevo diseño */}
  <button
    type="button"
    className="btn flex justify-center items-center ml-[10px]"
    onClick={toggleModal}
  >
    <strong className="strongP">COLOCA AQUI TU PUBLICIDAD</strong>
    <div id="container-stars">
      <div id="stars"></div>
    </div>

    <div id="glow">
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  </button>

  {/* Botón agregar publicidad */}
  <CheckPaymentButton/>
  <br></br>
  <DisplayImagesP/>
  <br></br>

  {/* Botón agregar publicidad */}
  <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Iniciativa de marketing</h1>
  <br></br>

  {isMobile ? <DisplayImagesMovil /> : <DisplayImages />}

  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-3xl w-full max-h-[500px] md:max-h-none">
        {/* Encabezado mejorado */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">
            Pago de Publicidad
          </h2>
          <p className="text-gray-600 text-lg">
            Elige tu opción de pago para colocar tu publicidad y haz crecer tu negocio.
          </p>
        </div>

        {/* Contenedor para las opciones horizontales */}
        <div className="flex space-x-6 mb-4">
          {/* Opción 1: Pago mensual */}
          <div className="p-4 rounded-md border border-gray-300 shadow-sm hover:shadow-lg transition duration-200 w-1/2">
            <p className="text-lg font-semibold">Opción 1: Pago Mensual</p>
            <p className="text-gray-600">Paga $33 USD cada mes para mantener tu publicidad activa.</p>
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order?.create({
                  intent: "CAPTURE", // Define la intención de pago
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: "33.00",  // Monto mensual
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                if (actions.order) {
                  return actions.order.capture().then((details) => {
                    alert(`Pago mensual completado`);
                    savePaymentToFirestore("mensual");
                    toggleModal();
                    return Promise.resolve();  // Asegura que siempre se devuelva una promesa
                  }).catch((err) => {
                    console.error("Error en la captura del pago:", err);
                    return Promise.resolve();  // También devolver una promesa en caso de error
                  });
                } else {
                  console.error("Order no disponible");
                  return Promise.resolve();  // Devolver una promesa vacía si `order` es undefined
                }
              }}
              onError={(err) => {
                console.error("Error en el pago mensual:", err);
                return Promise.resolve();  // Asegura que siempre se devuelva una promesa
              }}
            />
          </div>

          {/* Opción 2: Pago anual */}
          <div className="p-4 rounded-md border border-gray-300 shadow-sm hover:shadow-lg transition duration-200 w-1/2">
            <p className="text-lg font-semibold">Opción 2: Pago Anual</p>
            <p className="text-gray-600">Paga 200 USD ahorra un 95% al optar por el año</p>

            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order?.create({
                  intent: "CAPTURE", // Define la intención de pago
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: "200.00",  // Monto anual
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                if (actions.order) {
                  return actions.order.capture().then((details) => {
                    alert(`Pago anual completado`);
                    savePaymentToFirestore("anual");
                    toggleModal();
                    return Promise.resolve();  // Asegura que siempre se devuelva una promesa
                  }).catch((err) => {
                    console.error("Error en la captura del pago:", err);
                    return Promise.resolve();  // También devolver una promesa en caso de error
                  });
                } else {
                  console.error("Order no disponible");
                  return Promise.resolve();  // Devolver una promesa vacía si `order` es undefined
                }
              }}
              onError={(err) => {
                console.error("Error en el pago anual:", err);
                return Promise.resolve();  // Asegura que siempre se devuelva una promesa
              }}
            />
          </div>
        </div>

        {/* Botón para cerrar el modal */}
        <button
          onClick={toggleModal}
          className="mt-4 w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  )}
</div>

  );
};

export default ChatCard;
