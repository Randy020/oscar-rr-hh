import React, { useState } from 'react';
import { storage, db } from '@/lib/firebaseConfig'; // Asegúrate de importar correctamente la configuración
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';

export const ShopNowButtonP = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal para subir imagen
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); // Campo para URL
    const [uploading, setUploading] = useState(false);
  
    // Función para abrir y cerrar el modal de subida
    const toggleModal = () => setIsModalOpen(!isModalOpen);
  
    // Función para abrir el modal de éxito
    const openSuccessModal = () => setIsSuccessModalOpen(true);
  
    // Función para cerrar el modal de éxito
    const closeSuccessModal = () => setIsSuccessModalOpen(false);
  
    // Función para manejar la selección de archivos
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setSelectedImage(e.target.files[0]);
      }
    };
  
    // Función para manejar la entrada de URL
    const handleUrlChange = (e) => {
      setImageUrl(e.target.value);
    };
  
    // Función para manejar la subida de imágenes o URL a Firebase Storage y Firestore
    const handleUpload = async () => {
      setUploading(true);
  
      let imageUrlToUpload = imageUrl;
  
      // Si hay una imagen seleccionada, subirla a Firebase Storage
      if (selectedImage) {
        const storageRef = ref(storage, `/imagenes/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
  
        uploadTask.on(
          'state_changed',
          null, // Puedes manejar el progreso de la subida aquí si lo deseas
          (error) => {
            console.error('Error de subida:', error);
            setUploading(false);
          },
          async () => {
            // Obtener la URL de la imagen después de la subida
            imageUrlToUpload = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Guardar la URL de la imagen en Firestore
            try {
              await addDoc(collection(db, 'publicidadP'), {
                imageUrl: imageUrlToUpload,
                timestamp: new Date(),
              });
  
              // Limpiar el estado y cerrar el modal después de la subida
              setUploading(false);
              setIsModalOpen(false);
              setSelectedImage(null);
              setImageUrl('');
  
              // Abrir el modal de éxito
              openSuccessModal();
            } catch (error) {
              console.error('Error al guardar en Firestore:', error);
              setUploading(false);
            }
          }
        );
      } else if (imageUrl) {
        // Si solo se ingresa una URL, guardarla en Firestore
        try {
          await addDoc(collection(db, 'publicidad'), {
            imageUrl: imageUrlToUpload,
            timestamp: new Date(),
          });
  
          // Limpiar el estado y cerrar el modal después de la subida
          setUploading(false);
          setIsModalOpen(false);
          setImageUrl('');
  
          // Abrir el modal de éxito
          openSuccessModal();
        } catch (error) {
          console.error('Error al guardar en Firestore:', error);
          setUploading(false);
        }
      }
    };
  
    return (
      <div className="button-container">
        <button onClick={toggleModal} className="btnC">
          Subir Anuncio
        </button>
  
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"> {/* Aquí se agregó z-50 */}
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Subir Imagen o URL</h2>
              <h3 className="text-xl font-semibold mb-4">Arrastra o Suelta tu imagen</h3>
  
              {/* Subir Imagen */}
              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 mb-4 w-full"
              />
              {selectedImage && (
                <div className="mb-4">
                  <p>Archivo seleccionado: {selectedImage.name}</p>
                </div>
              )}
  
              {/* O Ingresar URL */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">O ingresa una URL de imagen</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="border p-2 w-full"
                />
              </div>
  
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
  
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`${
                    uploading ? 'bg-gray-500' : 'bg-blue-500'
                  } text-white px-4 py-2 rounded-md`}
                >
                  {uploading ? 'Subiendo...' : 'Subir'}
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Modal de éxito */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"> {/* Aquí también se agregó z-50 */}
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">¡Imagen o URL subida con éxito!</h2>
              <button
                onClick={closeSuccessModal}
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  

export const ShopNowButton  = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal para subir imagen
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal de éxito
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(''); // Campo para URL
    const [uploading, setUploading] = useState(false);
  
    // Función para abrir y cerrar el modal de subida
    const toggleModal = () => setIsModalOpen(!isModalOpen);
  
    // Función para abrir el modal de éxito
    const openSuccessModal = () => setIsSuccessModalOpen(true);
  
    // Función para cerrar el modal de éxito
    const closeSuccessModal = () => setIsSuccessModalOpen(false);
  
    // Función para manejar la selección de archivos
    const handleImageChange = (e) => {
      if (e.target.files[0]) {
        setSelectedImage(e.target.files[0]);
      }
    };
  
    // Función para manejar la entrada de URL
    const handleUrlChange = (e) => {
      setImageUrl(e.target.value);
    };
  
    // Función para manejar la subida de imágenes o URL a Firebase Storage y Firestore
    const handleUpload = async () => {
      setUploading(true);
  
      let imageUrlToUpload = imageUrl;
  
      // Si hay una imagen seleccionada, subirla a Firebase Storage
      if (selectedImage) {
        const storageRef = ref(storage, `/imagenes/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
  
        uploadTask.on(
          'state_changed',
          null, // Puedes manejar el progreso de la subida aquí si lo deseas
          (error) => {
            console.error('Error de subida:', error);
            setUploading(false);
          },
          async () => {
            // Obtener la URL de la imagen después de la subida
            imageUrlToUpload = await getDownloadURL(uploadTask.snapshot.ref);
  
            // Guardar la URL de la imagen en Firestore
            try {
              await addDoc(collection(db, 'publicidad'), {
                imageUrl: imageUrlToUpload,
                timestamp: new Date(),
              });
  
              // Limpiar el estado y cerrar el modal después de la subida
              setUploading(false);
              setIsModalOpen(false);
              setSelectedImage(null);
              setImageUrl('');
  
              // Abrir el modal de éxito
              openSuccessModal();
            } catch (error) {
              console.error('Error al guardar en Firestore:', error);
              setUploading(false);
            }
          }
        );
      } else if (imageUrl) {
        // Si solo se ingresa una URL, guardarla en Firestore
        try {
          await addDoc(collection(db, 'publicidad'), {
            imageUrl: imageUrlToUpload,
            timestamp: new Date(),
          });
  
          // Limpiar el estado y cerrar el modal después de la subida
          setUploading(false);
          setIsModalOpen(false);
          setImageUrl('');
  
          // Abrir el modal de éxito
          openSuccessModal();
        } catch (error) {
          console.error('Error al guardar en Firestore:', error);
          setUploading(false);
        }
      }
    };
  
    return (
      <div className="button-container">
        <button onClick={toggleModal} className="btnC">
          Subir Anuncio
        </button>
  
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">Subir Imagen o URL</h2>
              <h3 className="text-xl font-semibold mb-4">Arrastra o Suelta tu imagen</h3>
  
              {/* Subir Imagen */}
              <input
                type="file"
                onChange={handleImageChange}
                className="border p-2 mb-4 w-full"
              />
              {selectedImage && (
                <div className="mb-4">
                  <p>Archivo seleccionado: {selectedImage.name}</p>
                </div>
              )}
  
              {/* O Ingresar URL */}
              <div className="mb-4">
                <label className="block text-sm font-semibold">O ingresa una URL de imagen</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={handleUrlChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="border p-2 w-full"
                />
              </div>
  
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancelar
                </button>
  
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`${
                    uploading ? 'bg-gray-500' : 'bg-blue-500'
                  } text-white px-4 py-2 rounded-md`}
                >
                  {uploading ? 'Subiendo...' : 'Subir'}
                </button>
              </div>
            </div>
          </div>
        )}
  
        {/* Modal de éxito */}
        {isSuccessModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">¡Imagen o URL subida con éxito!</h2>
              <button
                onClick={closeSuccessModal}
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full"
              >
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };


