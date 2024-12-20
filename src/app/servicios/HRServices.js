'use client'; // Agrega esta directiva al inicio del archivo

import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import Image from 'next/image'; // Asegúrate de tener instalado Next.js Image
import { db } from "@/lib/firebaseConfig"; // Importa la instancia de Firestore ya configurada

const RecursosHumanos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "texto")); // Obtener todos los documentos de la colección "texto"
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8">Nuestros Servicios de Recursos Humanos</h2>
      {data.map((item, index) => (
        <div key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
          <div className="flex flex-col md:flex-row items-center">
            {/* Mostrar imagen si existe */}
            {item.image && (
              <Image
                src={item.image}
                width={600} // Ajusta según tu diseño
                height={400} // Ajusta según tu diseño
                className="rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
                alt={item.title}
              />
            )}
            {/* Mostrar el contenido de cada documento */}
            <ul className="list-disc pl-6 text-lg">
              {item.contenido && item.contenido.split("\n").map((text, i) => (
                <li key={i} className="mb-2">
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecursosHumanos;
