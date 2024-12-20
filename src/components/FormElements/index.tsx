"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "@/lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleFiles = useCallback((newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => typeValidation(file.type));
    setFiles((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => uploadFile(file));
  }, []);

  const typeValidation = (type: string) => {
    const splitType = type.split("/")[0];
    return type === "application/pdf" || splitType === "image" || splitType === "video";
  };

  const uploadFile = (file: File) => {
    const fileId = uuidv4();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No hay usuario autenticado");
      return;
    }

    const userId = user.uid;
    const storageRef = ref(storage, `imagenes/${fileId}-${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, "ofertas"), {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            fileUrl: downloadURL,
            uploadedBy: userId,
            timestamp: new Date(),
          })
            .then(() => {
              setUploadedFiles((prev) => [...prev, file.name]);
              setShowModal(true); // Mostrar modal después de subir
            })
            .catch((error) => {
              console.error("Error al guardar el archivo en Firestore:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error al subir el archivo a Storage:", error);
      });
  };

  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Publica Tu Oferta de Empleo
      </h4>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFiles = [...e.dataTransfer.files];
          handleFiles(droppedFiles);
        }}
        onClick={() => document.getElementById("fileInput")?.click()}
        className="flex flex-col items-center justify-center h-[30vh] border-4 border-dashed border-blue-500 rounded-lg dark:border-blue-400 cursor-pointer"
      >
        <p className="text-lg font-medium text-dark dark:text-white">
          Arrastra y suelta tu oferta de empleo aquí
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          o{" "}
          <span className="text-blue-500 dark:text-blue-400 font-semibold">
            contáctanos
          </span>{" "}
          para la creación de la misma.
        </p>
      </div>

      <input
        id="fileInput"
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFiles([...e.target.files!])}
      />

      {/* Lista de archivos subidos */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold dark:text-white">Archivos Subidos:</h3>
          <ul className="space-y-2">
            {uploadedFiles.map((fileName) => (
              <li key={fileName} className="text-sm dark:text-gray-300">
                {fileName}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-dark dark:text-white">
              ¡Archivo Subido!
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Tu oferta de empleo se ha subido exitosamente.
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
