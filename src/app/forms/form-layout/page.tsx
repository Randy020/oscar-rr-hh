"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebaseConfig"; // Importa Firestore y Storage configurados
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid"; // Importamos UUID
import ChatCard from "@/components/Chat/ChatCard";
import { useRouter } from "next/navigation"; 

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import InputGroup from "@/components/FormElements/InputGroup";
import GlitchLoader from "./GlitchLoader"; 

const FormLayout = () => {
  const router = useRouter(); // Inicializa useRouter
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
    cedulaPasaporte: "", // Nuevo campo para cédula o pasaporte
  });

  const [curriculum, setCurriculum] = useState<{ file: File | null; uniqueFileName: string | null }>({
    file: null,
    uniqueFileName: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const uniqueId = uuidv4(); // Genera un UUID único
      const uniqueFileName = `${uniqueId}-${file.name}`; // Añadimos el UUID al nombre del archivo
      setCurriculum({ file, uniqueFileName }); // Guardamos el archivo con el nombre único
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = "";

      if (curriculum.file) {
        // Subir el archivo a Firebase Storage
        const storageRef = ref(storage, `curriculums/${curriculum.uniqueFileName}`);

        const snapshot = await uploadBytes(storageRef, curriculum.file);
        fileUrl = await getDownloadURL(snapshot.ref);
      }

      // Subir los datos a Firestore
      await addDoc(collection(db, "formularios"), {
        ...formData,
        curriculum: fileUrl,
        timestamp: new Date(),
      });

      alert("Formulario enviado exitosamente.");
      // Limpiar el formulario después de enviar
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
        cedulaPasaporte: "", // Limpiar el nuevo campo
      });
      setCurriculum({ file: null, uniqueFileName: null }); // Limpiar archivo seleccionado

       // Redirige a la ruta raíz
       router.push("/");


    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el formulario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
       <DefaultLayout>
      <Breadcrumb pageName="Formulario" />
      
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
      <div className="col-span-12 xl:col-span-8">

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Formulario de Contacto --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-semibold text-dark dark:text-white">
                Formulario de Registro / Es obligatorio completar todos los campos
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">

                {/* Adjuntar Currículum */}
                <div className="mb-4.5">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Sube o Arastra tu Currículum Aqui con su foto
                  </label>
                  <input
                    type="file"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                </div>


                {/* Nombre y Apellido */}
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="Nombre"
                    type="text"
                    name="nombre"
                    placeholder="Ingrese su nombre"
                    customClasses="w-full xl:w-1/2"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                  <InputGroup
                    label="Apellido"
                    type="text"
                    name="apellido"
                    placeholder="Ingrese su apellido"
                    customClasses="w-full xl:w-1/2"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                  />
                </div>

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
                  placeholder="Seleccione su fecha de nacimiento"
                  customClasses="mb-4.5"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  required
                />

                {/* Teléfono y Celular */}
                <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                  <InputGroup
                    label="Teléfono"
                    type="tel"
                    name="telefono"
                    placeholder="Ingrese su teléfono fijo"
                    customClasses="w-full xl:w-1/2"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                  <InputGroup
                    label="Celular"
                    type="tel"
                    name="celular"
                    placeholder="Ingrese su celular"
                    customClasses="w-full xl:w-1/2"
                    value={formData.celular}
                    onChange={handleInputChange}
                    required
                  />
                </div>

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

                

                {/* Comentarios */}
                <div className="mb-6">
                  <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                    Comentarios
                  </label>
                  <textarea
                    name="comentarios"
                    rows={4}
                    placeholder="Escriba sus comentarios"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary active:border-primary disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    value={formData.comentarios}
                    onChange={handleInputChange}
                 
                  />
                </div>

                {/* Botón de Enviar */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className={`w-full rounded-[7px] bg-primary py-3 px-4 text-base font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50 ${
                      isSubmitting ? "cursor-not-allowed bg-opacity-50" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      <ChatCard />

      
      </div>
    </DefaultLayout>
    
  );
};

export default FormLayout;
