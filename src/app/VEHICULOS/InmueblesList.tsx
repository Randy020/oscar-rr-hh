"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebaseConfig"; // Asegúrate de que la configuración de Firebase esté correcta
import { collection, getDocs } from "firebase/firestore";
import { Divider } from "@mui/material";

interface Inmueble {
  id: string;
  fileUrl: string;
  // Puedes agregar más campos si es necesario
}

const InmueblesTable = () => {
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);

  useEffect(() => {
    const fetchInmuebles = async () => {
      try {
        // Se obtiene la colección "INMUEBLES"
        const inmueblesCollection = collection(db, "VEHICULOS");
        const snapshot = await getDocs(inmueblesCollection);
        const inmueblesList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Inmueble[];
        setInmuebles(inmueblesList);
      } catch (error) {
        console.error("Error obteniendo inmuebles:", error);
      }
    };

    fetchInmuebles();
  }, []);

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
      VEHICULOS
      </h4>

      {/* Se habilita el desplazamiento solo en móvil y se establece la altura a 460px */}
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] md:max-h-none">
        {inmuebles.map((inmueble) => (
          <div key={inmueble.id}>
            <Image
              src={inmueble.fileUrl}
              alt="Imagen del inmueble"
              width={639}
              height={848}
              objectFit="cover"
              className="rounded-lg"
            />
            <Divider
              sx={{
                margin: "20px 0",
                borderColor: "gray",
                borderWidth: 2,
                borderStyle: "dashed",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InmueblesTable;
