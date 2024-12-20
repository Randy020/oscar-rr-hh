  import { useEffect, useState } from "react";
  import Image from "next/image";
  import { db } from "@/lib/firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
  import { collection, getDocs } from "firebase/firestore";

  // Define el tipo para una oferta
  interface Oferta {
    fileUrl: string;
    fileName: string;
    fileSize: number;
    fileType: string;
    timestamp: any; // Puedes especificar un tipo más exacto según la estructura de tu timestamp
    uploadedBy: string;
  }

  const TableOne = () => {
    // Define el estado con el tipo 'Oferta[]'
    const [ofertas, setOfertas] = useState<Oferta[]>([]);

    useEffect(() => {
      const fetchOfertas = async () => {
        const ofertasCollection = collection(db, "ofertas"); // Asegúrate de que esta es la colección correcta
        const snapshot = await getDocs(ofertasCollection);
        const ofertasList = snapshot.docs.map(doc => doc.data() as Oferta); // Aquí tipificamos los datos
        setOfertas(ofertasList);
      };

      fetchOfertas();
    }, []);

    return (
      <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
        <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
          Ofertas De Empleo
        </h4>

        {/* Contenedor de las imágenes con layout en columna */}
        <div className="flex flex-col gap-4">
          {ofertas.map((oferta, key) => (
            <div key={key} className=""> {/*w-[639px] h-[848px] relative*/ }
              {/* Imagen con tamaño fijo */} 
              <Image
                src={oferta.fileUrl}
                alt="Oferta de empleo"
                width={639}    // Ancho fijo de 639px
                height={848}   // Alto fijo de 848px
                objectFit="cover"  // Asegura que la imagen no se distorsione y cubra el espacio
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  export default TableOne;
