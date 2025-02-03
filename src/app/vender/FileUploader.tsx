"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "@/lib/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

const categories = ["INMUEBLES", "VEHICULOS", "Animales", "Electrodomesticos", "Celulares", "Otros"];

const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();

  const handleFiles = useCallback((newFiles: File[]) => {
    if (!selectedCategory) {
      alert("Debes seleccionar una categoría antes de subir archivos.");
      return;
    }
    const validFiles = newFiles.filter((file) => typeValidation(file.type));
    setFiles((prev) => [...prev, ...validFiles]);
    validFiles.forEach((file) => uploadFile(file));
  }, [selectedCategory]);

  const typeValidation = (type: string) => {
    const splitType = type.split("/")[0];
    return type === "application/pdf" || splitType === "image" || splitType === "video";
  };

  const uploadFile = (file: File) => {
    if (!selectedCategory) {
      alert("Debes seleccionar una categoría antes de subir archivos.");
      return;
    }
    const fileId = uuidv4();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const userId = user.uid;
    const storageRef = ref(storage, `imagenes/${fileId}-${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          addDoc(collection(db, selectedCategory), {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
            fileUrl: downloadURL,
            uploadedBy: userId,
            timestamp: new Date(),
          })
            .then(() => {
              setUploadedFiles((prev) => [...prev, file.name]);
              setShowModal(true);
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
    

    <label className="block mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
  Selecciona una categoría:
</label>
<select 
  className="w-full p-3 border-2 border-yellow-500 rounded-lg 
             bg-yellow-100 text-gray-900 dark:bg-yellow-700 dark:text-white 
             hover:bg-yellow-200 dark:hover:bg-yellow-600 
             focus:ring-4 focus:ring-yellow-400 dark:focus:ring-yellow-500 
             transition-all"
  value={selectedCategory} 
  onChange={(e) => setSelectedCategory(e.target.value)}
>
  <option value="" disabled>Selecciona una categoría</option>
  {categories.map((category) => (
    <option key={category} value={category}>{category}</option>
  ))}
</select>


      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFiles = [...e.dataTransfer.files];
          handleFiles(droppedFiles);
        }}
        onClick={() => document.getElementById("fileInput")?.click()}
        className="flex flex-col items-center justify-center h-[30vh] border-4 border-dashed border-blue-500 rounded-lg dark:border-blue-400 cursor-pointer mt-4"
      >
        <p className="text-lg font-medium text-dark dark:text-white">
          Arrastra y suelta tu archivo aquí
        </p>
      </div>

      <input
        id="fileInput"
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFiles([...e.target.files!])}
      />

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
    </div>
  );
};

export default FileUploader;
