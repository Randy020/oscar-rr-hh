"use client";

import React, { useEffect, useState } from "react";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { db } from "@/lib/firebaseConfig";
import { motion } from "framer-motion";

const RecursosHumanos = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el encabezado (apartado0)
        const headerDocRef = doc(db, "texto", "apartado0");
        const headerSnap = await getDoc(headerDocRef);
        const headerText = headerSnap.exists()
          ? headerSnap.data().encabezado
          : "Nuestros Servicios de Recursos Humanos";
        setHeader(headerText);

        // Obtener el resto de documentos, excluyendo apartado0
        const querySnapshot = await getDocs(collection(db, "texto"));
        const documents = querySnapshot.docs
          .filter((doc) => doc.id !== "apartado0")
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        setData(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.h2
        className="text-4xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {header}
      </motion.h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-lg p-6 transition duration-300 transform hover:scale-105"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
              {item.title}
            </h3>

            {/* Mostrar imagen principal si existe */}
            {item.image && (
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={item.image}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  alt={item.title}
                />
              </div>
            )}

            {/* Lista personalizada: se filtran líneas vacías y se utiliza un marcador custom */}
            <ul className="pl-5 text-gray-700">
              {item.contenido &&
                item.contenido
                  .split("\n")
                  .filter((line) => line.trim() !== "")
                  .map((text, i) => {
                    // Si el texto es una imagen en base64
                    if (text.startsWith("data:image")) {
                      return (
                        <div key={i} className="my-2">
                          <Image
                            src={text}
                            alt="Contenido embebido"
                            width={600}
                            height={400}
                            className="rounded-lg"
                          />
                        </div>
                      );
                    }
                    // Texto con estilo custom para el marcador
                    return (
                      <li
                        key={i}
                        className="mb-2 relative pl-6 custom-bullet"
                      >
                        {text}
                      </li>
                    );
                  })}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Estilos para personalizar el marcador de la lista */}
      <style jsx>{`
        .custom-bullet::before {
          content: "▹"; /* Puedes cambiar este símbolo por el que prefieras */
          position: absolute;
          left: 0;
          color: #3b82f6; /* Color azul, puedes modificarlo */
        }
      `}</style>
    </div>
  );
};

export default RecursosHumanos;
