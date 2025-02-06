import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseConfig'; // Asegúrate de importar correctamente la configuración de Firebase
import { collection, getDocs } from 'firebase/firestore';

// Función auxiliar para transformar el link de YouTube a formato embed
const getYoutubeEmbedUrl = (url) => {
  let videoId;
  try {
    // Si es un link completo de YouTube (ejemplo: https://www.youtube.com/watch?v=VIDEO_ID)
    if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v");
    }
    // Si es un link corto (ejemplo: https://youtu.be/VIDEO_ID)
    else if (url.includes("youtu.be/")) {
      const parts = url.split("/");
      videoId = parts[parts.length - 1];
    }
  } catch (error) {
    console.error("Error extrayendo el ID de YouTube:", error);
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export const DisplayImagesP = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes o videos
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para obtener las imágenes/videos desde Firestore
  const fetchImages = async () => {
    try {
      // Obtener todos los documentos de la colección 'publicidadP'
      const querySnapshot = await getDocs(collection(db, "publicidadP"));
      const imageUrls = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        imageUrls.push({ id: docSnap.id, imageUrl: data.imageUrl });
      });

      setImages(imageUrls); // Actualizamos el estado con las imágenes/videos obtenidos
      setLoading(false); // Finalizamos el estado de carga
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
      setLoading(false); // Cambiar estado de carga a falso en caso de error
    }
  };

  // Ejecutamos la función al montar el componente
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="image-gallery">
      {loading ? (
        <p>Cargando imágenes...</p>
      ) : (
        <div className="space-y-4">
          {images.map((item) => (
  <div key={item.id} className="image-item">
    {item.imageUrl?.includes("youtube.com") || item.imageUrl?.includes("youtu.be") ? (
      <iframe
        width="560"
        height="315"
        src={getYoutubeEmbedUrl(item.imageUrl)}
        title={`Video ${item.id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full rounded-md"
      ></iframe>
    ) : (
      <img
        src={item.imageUrl}
        alt={`Imagen ${item.id}`}
        className="w-full h-auto rounded-md"
      />
    )}
  </div>
))}
        </div>
      )}
    </div>
  );
};

export const DisplayImages = () => {
  const [images, setImages] = useState([]); // Estado para almacenar las imágenes o videos
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para obtener las imágenes/videos desde Firestore
  const fetchImages = async () => {
    try {
      // Obtener todos los documentos de la colección 'publicidadP'
      const querySnapshot = await getDocs(collection(db, "publicidad"));
      const imageUrls = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        imageUrls.push({ id: docSnap.id, imageUrl: data.imageUrl });
      });

      setImages(imageUrls); // Actualizamos el estado con las imágenes/videos obtenidos
      setLoading(false); // Finalizamos el estado de carga
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
      setLoading(false); // Cambiar estado de carga a falso en caso de error
    }
  };

  // Ejecutamos la función al montar el componente
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="image-gallery">
      {loading ? (
        <p>Cargando imágenes...</p>
      ) : (
        <div className="space-y-4">
          {images.map((item) => (
  <div key={item.id} className="image-item">
    {item.imageUrl?.includes("youtube.com") || item.imageUrl?.includes("youtu.be") ? (
      <iframe
        width="560"
        height="315"
        src={getYoutubeEmbedUrl(item.imageUrl)}
        title={`Video ${item.id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full rounded-md"
      ></iframe>
    ) : (
      <img
        src={item.imageUrl}
        alt={`Imagen ${item.id}`}
        className="w-full h-auto rounded-md"
      />
    )}
  </div>
))}
        </div>
      )}
    </div>
  );
};



export const DisplayImagesMovil = () => {
    const [images, setImages] = useState([]); // Estado para almacenar las imágenes
    const [loading, setLoading] = useState(true); // Estado de carga
    const [currentIndex, setCurrentIndex] = useState(0); // Estado para controlar el índice de la imagen activa
    
    // Función para obtener las imágenes desde Firestore
    const fetchImages = async () => {
      try {
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
  
    // Usamos useEffect para controlar el intervalo de cambio de imagen cada 30 segundos
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Cambia al siguiente índice
      }, 5000); // Cambiar imagen cada 30 segundos (30000 ms)
  
      // Limpiar el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    }, [images.length]);
  
    // Renderizamos el componente
    return (
      <div className="image-gallery overflow-hidden" style={{ height: '400px' }}>
        {loading ? (
          <p>Cargando imágenes...</p>
        ) : (
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((image) => (
              <div key={image.id} className="w-full flex-shrink-0">
                <img
                  src={image.imageUrl}
                  alt={`Imagen ${image.id}`}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


