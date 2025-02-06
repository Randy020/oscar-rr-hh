'use client';

import React, { useEffect, useState } from 'react';
import { getDocs, getDoc, doc, collection } from 'firebase/firestore';
import { db } from "@/lib/firebaseConfig";
import Image from 'next/image';

const SuccessCases = () => {
  const [data, setData] = useState([]);
  const [header, setHeader] = useState("Casos de Éxito"); // Estado para el encabezado

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el encabezado desde Firestore (apartado0)
        const headerDocRef = doc(db, "textoCE", "apartado0");
        const headerSnap = await getDoc(headerDocRef);
        if (headerSnap.exists()) {
          setHeader(headerSnap.data().encabezado || "Casos de Éxito");
        }
        
        // Obtener el resto de documentos, excluyendo apartado0
        const querySnapshot = await getDocs(collection(db, "textoCE"));
        const documents = querySnapshot.docs
          .filter((doc) => doc.id !== "apartado0")
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

        setData(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return <div>Cargando...</div>;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center">
          {header} {/* Se muestra el encabezado dinámico */}
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Resultados que hablan por sí mismos
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map(item => (
            <div
              key={item.id}
              className="bg-white p-8 shadow-lg rounded-2xl transform transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative w-full h-56 overflow-hidden rounded-xl">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    className="object-cover"
                  />
                )}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                {item.title}
              </h3>
              <p className="mt-4 text-gray-600 text-center">
                {item.contenido}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
