"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig"; // Asegúrate de que el path sea correcto
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import { AiOutlineDownload, AiOutlineDelete, AiOutlineEye, AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai"; // Iconos de react-icons
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { updateDoc, arrayRemove } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore"; // Importar onSnapshot

const OfertaDisplay = () => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOferta, setSelectedOferta] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null); // Estado para el Accordion
  const [currentUserUID, setCurrentUserUID] = useState(null);
  const [aplicantes, setAplicantes] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUID(user.uid);
      } else {
        setCurrentUserUID(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUserUID) return;

    const fetchOfertas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "ofertas"));
        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((oferta) => oferta.uploadedBy === currentUserUID); // Filtra por el UID
        setOfertas(data);
      } catch (error) {
        console.error("Error al obtener las ofertas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, [currentUserUID]);

  const fetchAplicantes = async (ofertaId) => {
    try {
      const docRef = doc(db, "ofertas", ofertaId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const aplicantesData = docSnapshot.data().aplicantes || [];
        setAplicantes((prevAplicantes) => ({
          ...prevAplicantes,
          [ofertaId]: aplicantesData,
        }));
      }
    } catch (error) {
      console.error("Error al obtener los aplicantes:", error);
    }
  };

  const openModal = (oferta) => {
    setSelectedOferta(oferta);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOferta(null);
  };

  const deleteOferta = async (id) => {
    try {
      await deleteDoc(doc(db, "ofertas", id));
      setOfertas(ofertas.filter((oferta) => oferta.id !== id));
    } catch (error) {
      console.error("Error al eliminar la oferta:", error);
    } finally {
      closeModal();
    }
  };

  useEffect(() => {
    if (!currentUserUID) return;
  
    const unsubscribe = onSnapshot(collection(db, "ofertas"), (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((oferta) => oferta.uploadedBy === currentUserUID);
  
      setOfertas(data);
    });
  
    return () => unsubscribe(); // Cleanup
  }, [currentUserUID]);
  
  useEffect(() => {
    if (selectedOferta) {
      fetchAplicantes(selectedOferta.id);
    }
  }, [selectedOferta]);
  
  const eliminarAplicante = async (ofertaId, aplicante) => {
    try {
      const ofertaRef = doc(db, "ofertas", ofertaId);
      await updateDoc(ofertaRef, {
        aplicantes: arrayRemove(aplicante),
      });
  
      // Recargar aplicantes de esta oferta después de eliminar uno
      fetchAplicantes(ofertaId);
    } catch (error) {
      console.error("Error al eliminar el aplicante:", error);
    }
  };


  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id); // Alternar la vista del Accordion
    fetchAplicantes(id); // Cargar aplicantes cuando se abra el Accordion
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 h-full">
        <div className="border-b p-4 bg-gray-100 dark:bg-gray-700 text-xl font-semibold text-gray-900 dark:text-white">
          Ofertas Publicadas
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-250px)]">
          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Cargando ofertas...</p>
          ) : ofertas.length > 0 ? (
            ofertas.map((oferta) => (
              <div key={oferta.id} className="mb-4">
                <div className="border-b border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 dark:bg-gray-600">
                    <div>{oferta.uploadedBy}</div>
                    <div>
                      {oferta.timestamp ? (
                        format(new Date(oferta.timestamp.seconds * 1000), "dd/MM/yyyy HH:mm:ss")
                      ) : (
                        <span className="text-gray-500">Fecha no disponible</span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleAccordion(oferta.id)}
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
                    >
                      {openAccordion === oferta.id ? (
                        <AiOutlineCaretUp />
                      ) : (
                        <AiOutlineCaretDown />
                      )}
                      Ver aplicantes
                    </button>
                  </div>

                  {openAccordion === oferta.id && (
  <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700">
    <ul className="w-full">
  {aplicantes[oferta.id] && aplicantes[oferta.id].length > 0 ? (
    aplicantes[oferta.id].map((aplicante, index) => (
      <li
        key={index}
        className="border-b py-4 px-6 text-left"
      >
        <div className="mb-2"><strong >Nombre:</strong> {aplicante.nombre} {aplicante.apellido}</div>
        <div className="mb-2"><strong>Cédula/Pasaporte:</strong> {aplicante.cedulaPasaporte}</div>
        <div className="mb-2"><strong>Teléfono:</strong> {aplicante.telefono}</div>
        <div className="mb-2"><strong>Correo:</strong> {aplicante.correo}</div>
        <div className="mb-2"><strong>Fecha de Nacimiento:</strong> {aplicante.fechaNacimiento}</div>
        <div className="mb-2"><strong>Profesión:</strong> {aplicante.profesion}</div>
        <div className="mb-2"><strong>Nivel Académico:</strong> {aplicante.nivelAcademico}</div>
        <div className="mb-2"><strong>Comentarios:</strong> {aplicante.comentarios}</div>
        <div className="mb-2">
          <strong>Currículo:</strong> 
          <a 
            href={aplicante.curriculo} 
            target="_blank" 
            className="text-blue-500 hover:underline ml-2"
          >
            Ver Currículo
          </a>
        </div>
        <div className="mb-4">
          <strong>Fecha de Aplicación:</strong> 
          {format(new Date(aplicante.fechaAplicacion.seconds * 1000), "dd/MM/yyyy HH:mm:ss")}
        </div>
        <button
          onClick={() => eliminarAplicante(oferta.id, aplicante)}
          className="text-red-600 hover:text-red-800 py-2 px-4 rounded-md border border-red-600"
        >
          <AiOutlineDelete className="inline mr-1" /> Eliminar Aplicante
        </button>
      </li>
    ))
  ) : (
    <p className="text-gray-500 px-6">No hay aplicantes aún.</p>
  )}
</ul>

  </div>
)}
                </div>

                <div className="flex justify-between mt-2">
                  <a
                    href={oferta.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-2 py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700"
                  >
                    <AiOutlineEye /> Ver Documento
                  </a>

                  <button
                    onClick={() => openModal(oferta)}
                    className="text-blue-500 hover:text-blue-700 flex items-center gap-2 py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700"
                  >
                    <AiOutlineEye /> Ver detalles
                  </button>
                  <button
                    onClick={() => deleteOferta(oferta.id)}
                    className="ml-2 text-red-600 hover:text-red-800 flex items-center gap-2 py-2 px-3 rounded-md hover:bg-red-100 dark:hover:bg-red-700"
                  >
                    <AiOutlineDelete /> Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">No hay ofertas publicadas.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedOferta && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Detalles de la Oferta</h2>
              <button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div><strong>Usuario:</strong> {selectedOferta.uploadedBy}</div>
              <div><strong>Fecha de Publicación:</strong> {selectedOferta.timestamp ? format(new Date(selectedOferta.timestamp.seconds * 1000), "dd/MM/yyyy HH:mm:ss") : 'Fecha no disponible'}</div>
            </div>
            <div className="mt-4 flex justify-between">
              <a
                href={selectedOferta.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
              >
                <AiOutlineDownload /> Descargar Oferta
              </a>
              <button
                onClick={() => deleteOferta(selectedOferta.id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-2 py-2 px-3 rounded-md hover:bg-red-100 dark:hover:bg-red-700"
              >
                <AiOutlineDelete /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertaDisplay;
