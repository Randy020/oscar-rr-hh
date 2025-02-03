import { useEffect, useState } from "react";
import Image from "next/image";
import { db, storage } from "@/lib/firebaseConfig"; // Importa también el storage
import { collection, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import InputGroup from "@/components/FormElements/InputGroup";
import { Divider, Typography, Box } from '@mui/material';

interface Oferta {
  id: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  timestamp: any;
  uploadedBy: string;
}

const TableOne = () => {
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfertaId, setSelectedOfertaId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    fechaNacimiento: "",
    telefono: "",
    celular: "",
    nivelAcademico: "",
    profesion: "",
    comentarios: "",
    cedulaPasaporte: "",
    curriculo: null as File | null,
  });

  useEffect(() => {
    const fetchOfertas = async () => {
      const ofertasCollection = collection(db, "ofertas");
      const snapshot = await getDocs(ofertasCollection);
      const ofertasList = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Oferta[];
      setOfertas(ofertasList);
    };
    fetchOfertas();
  }, []);

  const handleApplyClick = (ofertaId: string) => {
    setSelectedOfertaId(ofertaId);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        curriculo: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOfertaId && formData.curriculo) {
      // Subir archivo a Firebase Storage
      const storageRef = ref(storage, `curriculums/${formData.curriculo.name}`);
      const uploadTask = uploadBytesResumable(storageRef, formData.curriculo);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progreso de la carga
        },
        (error) => {
          console.error("Error subiendo el archivo", error);
        },
        async () => {
          // Una vez subido el archivo, obtener la URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Guardar la URL en Firestore
          const ofertaRef = doc(db, "ofertas", selectedOfertaId);
          await updateDoc(ofertaRef, {
            aplicantes: arrayUnion({
              nombre: formData.nombre,
              apellido: formData.apellido,
              correo: formData.correo,
              fechaNacimiento: formData.fechaNacimiento,
              telefono: formData.telefono,
              celular: formData.celular,
              nivelAcademico: formData.nivelAcademico,
              profesion: formData.profesion,
              comentarios: formData.comentarios,
              cedulaPasaporte: formData.cedulaPasaporte,
              fechaAplicacion: new Date(),
              curriculo: downloadURL, // Guardar la URL del archivo
            }),
          });

          setIsModalOpen(false);
          setFormData({
            nombre: "",
            apellido: "",
            correo: "",
            fechaNacimiento: "",
            telefono: "",
            celular: "",
            nivelAcademico: "",
            profesion: "",
            comentarios: "",
            cedulaPasaporte: "",
            curriculo: null,
          });
        }
      );
    }
  };

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
    <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
      Ofertas De Empleo
    </h4>
  
    {/* Se habilita el desplazamiento solo en móvil y se establece la altura a 460px */}
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] md:max-h-none">
      {ofertas.map((oferta) => (
        <div key={oferta.id}>
          <Image
            src={oferta.fileUrl}
            alt="Oferta de empleo"
            width={639}
            height={848}
            objectFit="cover"
            className="rounded-lg"
          />
          <Divider 
        sx={{
          margin: '20px 0', 
          borderColor: 'gray',      // Color de la línea
          borderWidth: 2,          // Grosor de la línea
          borderStyle: 'dashed',   // Estilo de la línea (puede ser 'solid', 'dotted', 'dashed', etc.)
        }} 
      />
        </div>
      ))}
    </div>
  
     {/* Modal */}
     {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          style={{ position: "fixed", top: "120px" }}
        >
          <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh] dark:bg-gray-dark dark:text-white">
            {/* Botón para cerrar dentro del cuadro */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-center">Aplicar a la oferta</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-300 font-bold"
              >
                X
              </button>
            </div>
  
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Adjuntar Currículum */}
              <div className="mb-4.5">
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Sube o Arrastra tu Currículum
                </label>
                <input
                  type="file"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                />
              </div>
  
              <InputGroup
                label="Nombre"
                type="text"
                name="nombre"
                placeholder="Ingrese su nombre"
                customClasses="mb-4.5"
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
  
              {/* Apellido */}
              <InputGroup
                label="Apellido"
                type="text"
                name="apellido"
                placeholder="Ingrese su apellido"
                customClasses="mb-4.5"
                value={formData.apellido}
                onChange={handleInputChange}
                required
              />
  
              {/* Correo Electrónico */}
              <InputGroup
                label="Correo Electrónico"
                type="email"
                name="correo"
                placeholder="Ingrese su correo electrónico"
                customClasses="mb-4.5"
                value={formData.correo}
                onChange={handleInputChange}
                required
              />
  
              {/* Fecha de Nacimiento */}
              <InputGroup
                label="Fecha de Nacimiento"
                type="date"
                name="fechaNacimiento"
                placeholder=""
                customClasses="mb-4.5"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                required
              />
  
              {/* Teléfono */}
              <InputGroup
                label="Teléfono"
                type="tel"
                name="telefono"
                placeholder="Ingrese su teléfono fijo"
                customClasses="mb-4.5"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
  
              {/* Celular */}
              <InputGroup
                label="Celular"
                type="tel"
                name="celular"
                placeholder="Ingrese su celular"
                customClasses="mb-4.5"
                value={formData.celular}
                onChange={handleInputChange}
                required
              />
  
              {/* Nivel Académico */}
              <InputGroup
                label="Nivel Académico"
                type="text"
                name="nivelAcademico"
                placeholder="Ingrese su nivel académico"
                customClasses="mb-4.5"
                value={formData.nivelAcademico}
                onChange={handleInputChange}
                required
              />
  
              {/* Profesión */}
              <InputGroup
                label="Profesión"
                type="text"
                name="profesion"
                placeholder="Ingrese su profesión"
                customClasses="mb-4.5"
                value={formData.profesion}
                onChange={handleInputChange}
                required
              />
  
              {/* Comentarios */}
              <div className="mb-4.5">
                <label
                  htmlFor="comentarios"
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                >
                  Comentarios
                </label>
                <textarea
                  name="comentarios"
                  placeholder="Ingrese sus comentarios"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                  value={formData.comentarios}
                  onChange={handleInputChange}
                />
              </div>
  
              {/* Cédula o Pasaporte */}
              <InputGroup
                label="Cédula o Pasaporte"
                type="text"
                name="cedulaPasaporte"
                placeholder="Ingrese su cédula o pasaporte"
                customClasses="mb-4.5"
                value={formData.cedulaPasaporte}
                onChange={handleInputChange}
                required
              />
  
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-primary py-2 px-6 text-white font-semibold rounded-lg shadow-lg"
                >
                  Enviar Solicitud
                </button> 
              </div>
            </form>
          </div>
        </div>
      )}
  </div>
  
  );
  
};

export default TableOne;
