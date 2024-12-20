import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseConfig'; // Asegúrate de importar correctamente la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';

export const DisplayImagesP = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para obtener las imágenes desde Firestore
  const fetchImages = async () => {
    try {
      // Obtener todas las imágenes de la colección 'publicidad'
      const querySnapshot = await getDocs(collection(db, 'publicidadP'));
      const imageUrls = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        imageUrls.push({ id: docSnap.id, imageUrl: data.imageUrl });
      });

      setImages(imageUrls); // Actualizamos el estado con las imágenes obtenidas
      setLoading(false); // Cambiamos el estado de carga
    } catch (error) {
      console.error('Error al obtener las imágenes:', error);
      setLoading(false); // Cambiar estado de carga a falso en caso de error
    }
  };

  // Usamos useEffect para ejecutar la función cuando el componente se monta
  useEffect(() => {
    fetchImages();
  }, []);

  // Renderizamos el componente
  return (
    <div className="image-gallery">
      {loading ? (
        <p>Cargando imágenes...</p>
      ) : (
        <div className="space-y-4"> {/* Agregar espacio entre las imágenes */}
          {images.map((image) => (
            <div key={image.id} className="image-item">
              <img
                src={image.imageUrl}
                alt={`Imagen ${image.id}`}
                className="w-full h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const DisplayImages = () => {
    const [images, setImages] = useState([]); // Estado para almacenar las imágenes
    const [loading, setLoading] = useState(true); // Estado de carga
  
    // Función para obtener las imágenes desde Firestore
    const fetchImages = async () => {
      try {
        // Obtener todas las imágenes de la colección 'publicidad'
        const querySnapshot = await getDocs(collection(db, 'publicidad'));
        const imageUrls = [];
  
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          imageUrls.push({ id: docSnap.id, imageUrl: data.imageUrl });
        });
  
        setImages(imageUrls); // Actualizamos el estado con las imágenes obtenidas
        setLoading(false); // Cambiamos el estado de carga
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setLoading(false); // Cambiar estado de carga a falso en caso de error
      }
    };
  
    // Usamos useEffect para ejecutar la función cuando el componente se monta
    useEffect(() => {
      fetchImages();
    }, []);
  
    // Renderizamos el componente
    return (
      <div className="image-gallery">
        {loading ? (
          <p>Cargando imágenes...</p>
        ) : (
          <div className="space-y-4"> {/* Agregar espacio entre las imágenes */}
            {images.map((image) => (
              <div key={image.id} className="image-item">
                <img
                  src={image.imageUrl}
                  alt={`Imagen ${image.id}`}
                  className="w-full h-auto rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


