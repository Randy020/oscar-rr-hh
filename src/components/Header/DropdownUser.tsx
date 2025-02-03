import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebaseConfig"; // Asegúrate de importar 'db' (Firestore)
import { collection, addDoc } from "firebase/firestore"; // Importa las funciones necesarias de Firestore
import Image from "next/image";
import { FaUserAlt, FaBriefcase } from "react-icons/fa"; // Iconos de postulante y empleador
import { signInWithGoogle, signInWithGoogleEmpleador, logOut } from "@/lib/firebaseConfig"; // Importa las funciones de autenticación
import ClickOutside from "@/components/ClickOutside";
import Link from 'next/link';



const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal
  const [user, loading, error] = useAuthState(auth); // Hook de autenticación de Firebase
  const [formData, setFormData] = useState({
    direccion: "",
    calle: "",
    numero: "",
    sector: "",
    paraje: "",
    municipio: "",
    provincia: "",
    telefono: "",
    celular: "",
    email: "",
    cedulaPasaporte: "",
    actividad: ""
  });

  const userName = user ? user.displayName : "Iniciar sesión";
  const userImage = user ? user.photoURL : "/images/76f3f3007969fd3b6db21c744e1ef289.jpg"; // Imagen por defecto si no está logeado

  const handleSignInAsEmpleador = async () => {
    const result = await signInWithGoogleEmpleador();
    console.log(result); // Agregar log para ver el valor de "result"
    if (result === "no-empleador") {
      setModalOpen(true); // Si no es empleador, abrir el modal
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtener la referencia de la colección 'userEmpleador'
    const userEmpleadorRef = collection(db, "userEmpleador");
 
    if (user) {
    try {
      // Subir los datos del formulario a Firestore
      await addDoc(userEmpleadorRef, {
        direccion: formData.direccion,
        calle: formData.calle,
        numero: formData.numero,
        sector: formData.sector,
        paraje: formData.paraje,
        municipio: formData.municipio,
        provincia: formData.provincia,
        telefono: formData.telefono,
        celular: formData.celular,
        cedulaPasaporte: formData.cedulaPasaporte,
        email: formData.email,
        actividad: formData.actividad,
        uid: user.uid, // Agregar el UID del usuario autenticado
        createdAt: new Date(), // Añadir la fecha de creación
      });

      // Cerrar el modal después de enviar los datos
      setModalOpen(false);
      console.log("Formulario enviado con éxito a Firestore");
    } catch (error) {
      console.error("Error al subir los datos a Firestore:", error);
    }
  }};

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={userImage!}
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{userName}</span>

          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </Link>

      {dropdownOpen && (
        <div
          className={`absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark`}
        >
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src={userImage!}
                alt="User"
                className="overflow-hidden rounded-full"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span>

            <span className="block">
              <span className="block font-medium text-dark dark:text-white">
                {userName}
              </span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">
                {user ? user.email : "No conectado"}
              </span>
            </span>
          </div>

          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              {user ? (
                <button
                  onClick={logOut}
                  className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
                >
                  Cerrar sesión
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSignInAsEmpleador} // Iniciar sesión como empleador
                    className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
                  >
                    <FaBriefcase className="text-xl" /> {/* Icono de empleador */}
                    Iniciar sesión o crear cuenta
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Modal con formulario de empleador */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold">Formulario de Registro</h2>
            <form onSubmit={handleSubmitForm}>
              <div className="grid gap-4 mt-4">
                {/* Dirección Completa */}
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="calle"
                    placeholder="Calle"
                    value={formData.calle}
                    onChange={handleInputChange}
                    required
                    className="p-2 border border-gray-300 rounded-md w-full"
                  />
                  <input
                    type="text"
                    name="numero"
                    placeholder="No."
                    value={formData.numero}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded-md w-full"
                    required
                  />
                </div>
                <div className="flex gap-4 mt-2">
                <input
                  type="text"
                  name="sector"
                  placeholder="Sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  name="provincia"
                  placeholder="Provincia"
                  value={formData.provincia}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                </div>

              <div className="flex gap-4 mt-2">
                {/* Teléfonos */}
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />

                <input
                  type="tel"
                  name="celular"
                  placeholder="Celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full mt-2"
                />
                </div>

                {/* Información del negocio */}
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />

                <button
                  type="submit"
                  className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md"
                >
                  Enviar formulario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
