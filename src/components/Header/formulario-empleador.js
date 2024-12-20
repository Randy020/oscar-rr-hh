import { useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";

const FormularioEmpleadorModal = () => {
  const [user] = useAuthState(auth);
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [address, setAddress] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [sector, setSector] = useState("");
  const [paraje, setParaje] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessActivity, setBusinessActivity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      const userRef = doc(db, "userEmpleador", user.uid); // Crear documento con UID de usuario
      await setDoc(userRef, {
        companyName,
        jobDescription,
        address,
        street,
        number,
        sector,
        paraje,
        municipality,
        province,
        phone,
        cellPhone,
        email,
        businessActivity
      });
      setModalOpen(false); // Cerrar el modal después de enviar los datos
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
      >
        Iniciar sesión como empleador
      </button>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 max-w-full">
            <h2 className="text-2xl font-semibold mb-4">Formulario de Empleador</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Nombre de la empresa:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Descripción del puesto:</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              ></textarea>

              <label className="block mb-2">Dirección del negocio:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Calle:</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Número:</label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Sector:</label>
              <input
                type="text"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Paraje:</label>
              <input
                type="text"
                value={paraje}
                onChange={(e) => setParaje(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Municipio:</label>
              <input
                type="text"
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Provincia:</label>
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Teléfono:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Celular:</label>
              <input
                type="text"
                value={cellPhone}
                onChange={(e) => setCellPhone(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Correo electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <label className="block mb-2">Actividad del negocio:</label>
              <input
                type="text"
                value={businessActivity}
                onChange={(e) => setBusinessActivity(e.target.value)}
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded"
              />

              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              >
                Registrar como empleador
              </button>
            </form>

            {/* Botón para cerrar el modal */}
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 w-full py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormularioEmpleadorModal;
