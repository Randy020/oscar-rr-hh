"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig"; // Importa tu configuración de Firebase
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { format } from "date-fns";
import { AiOutlineDownload, AiOutlineDelete, AiOutlineEye } from "react-icons/ai"; // Iconos de react-icons

const FormDataDisplay = () => {
  const [formData, setFormData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<any | null>(null); // Estado para el formulario seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "formularios"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFormData(data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  // Función para abrir el modal con los datos del formulario seleccionado
  const openModal = (form: any) => {
    setSelectedForm(form);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedForm(null);
  };

  // Función para eliminar un formulario
  const deleteFormData = async (id: string) => {
    try {
      await deleteDoc(doc(db, "formularios", id)); // Elimina el documento de Firestore
      setFormData(formData.filter((data) => data.id !== id)); // Actualiza el estado
    } catch (error) {
      console.error("Error al eliminar el formulario:", error);
    } finally {
      closeModal();
    }
  };

  return (
    <div className="overflow-x-auto px-4 py-6">
      <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 h-full">
        <div className="border-b p-4 bg-gray-100 dark:bg-gray-700 text-xl font-semibold text-gray-900 dark:text-white">
          Datos del Formulario
        </div>
        <div className="p-4 overflow-y-auto max-h-[calc(100vh-250px)]"> {/* Max height and vertical scroll */}
          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Cargando datos...</p>
          ) : formData.length > 0 ? (
            <table className="w-full table-auto border-collapse text-sm text-gray-700 dark:text-gray-300">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-600">
                  <th className="py-3 px-4 text-left">Nombre</th>
                  <th className="py-3 px-4 text-left">Apellido</th>
                  <th className="py-3 px-4 text-left">Correo</th>
                  <th className="py-3 px-4 text-left">Teléfono</th>
                  <th className="py-3 px-4 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((data) => (
                  <tr key={data.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-3 px-4">{data.nombre || "No especificado"}</td>
                    <td className="py-3 px-4">{data.apellido || "No especificado"}</td>
                    <td className="py-3 px-4">{data.correo || "No especificado"}</td>
                    <td className="py-3 px-4">{data.telefono || "No especificado"}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => openModal(data)}
                        className="text-blue-500 hover:text-blue-700 flex items-center gap-2 py-2 px-3 rounded-md hover:bg-blue-100 dark:hover:bg-blue-700"
                      >
                        <AiOutlineEye /> Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300">No hay datos para mostrar.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
        <div style={{ position: 'relative', top: '40px' }} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Detalles del Formulario</h2>
            <button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              ×
            </button>
          </div>
          <div className="space-y-4">
            <div><strong>Nombre:</strong> {selectedForm.nombre || "No especificado"}</div>
            <div><strong>Apellido:</strong> {selectedForm.apellido || "No especificado"}</div>
            <div><strong>Correo:</strong> {selectedForm.correo || "No especificado"}</div>
            <div><strong>Teléfono:</strong> {selectedForm.telefono || "No especificado"}</div>
            <div><strong>Celular:</strong> {selectedForm.celular || "No especificado"}</div>
            <div><strong>Nivel Académico:</strong> {selectedForm.nivelAcademico || "No especificado"}</div>
            <div><strong>Profesión:</strong> {selectedForm.profesion || "No especificada"}</div>
            <div><strong>Fecha Nacimiento:</strong> {selectedForm.fechaNacimiento || "No especificada"}</div>
            <div>
              <strong>Comentarios:</strong>
              <div className="max-h-40 overflow-y-auto p-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                {selectedForm.comentarios || "Sin comentarios"}
              </div>
            </div>
            <div><strong>Fecha Registro:</strong> {selectedForm.timestamp ? format(new Date(selectedForm.timestamp.seconds * 1000), "dd/MM/yyyy HH:mm:ss") : "Sin fecha"}</div>
          </div>
          <div className="mt-4 flex justify-between">
            {selectedForm.curriculum && (
              <a
                href={selectedForm.curriculum}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
              >
                <AiOutlineDownload /> Descargar Currículum
              </a>
            )}
            <button
              onClick={() => deleteFormData(selectedForm.id)}
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

export default FormDataDisplay;
