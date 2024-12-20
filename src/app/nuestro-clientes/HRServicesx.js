'use client'; // Agrega esta directiva al inicio del archivo

import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig"; // Importa la instancia de Firestore ya configurada
import Image from 'next/image'; // Importar el componente Image de Next.js

const Testimonials = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "textoNC")); // Obtener todos los documentos de la colección "texto"
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id, // ID del documento
          ...doc.data() // Datos del documento
        }));
        setData(documents); // Guardar los datos en el estado
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
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          Recursos Humanos
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Información relevante para el área de recursos humanos.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-white p-8 shadow-lg rounded-2xl transform transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative w-28 h-28 mx-auto">
                {item.image && (
                  <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  className="object-cover rounded-full"
                />
                )}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 text-center">{item.contenido}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;



