import React from 'react';
import { getFirestore, doc, updateDoc, deleteField } from 'firebase/firestore';

const VideoActions = ({ videoUrl }) => {
  const db = getFirestore();

  const handleReplaceUrl = async () => {
    const newUrl = prompt('Ingrese la nueva URL del video:', videoUrl);
    if (newUrl) {
      try {
        const docRef = doc(db, 'videos', 'videoDocumentId'); // Usar el mismo ID
        await updateDoc(docRef, { url: newUrl });
        alert('URL reemplazada exitosamente.');
        console.log('URL nueva:', newUrl);
      } catch (error) {
        console.error('Error al reemplazar la URL:', error);
      }
    }
  };

  const handleDeleteUrl = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar la URL?')) {
      try {
        const docRef = doc(db, 'videos', 'videoDocumentId'); // Usar el mismo ID
        await updateDoc(docRef, { url: deleteField() });
        alert('URL eliminada exitosamente.');
        console.log('URL eliminada.');
      } catch (error) {
        console.error('Error al eliminar la URL:', error);
      }
    }
  };

  return (
    <div
      className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-lg flex flex-col items-center gap-4"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      <button
        onClick={handleReplaceUrl}
        className="text-blue-500 hover:text-blue-600 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
      >
        Reemplazar URL
      </button>
      <button
        onClick={handleDeleteUrl}
        className="text-red-500 hover:text-red-600 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
      >
        Eliminar URL
      </button>
      <a
  href="/Admin"
  className="text-green-500 hover:text-blue-600 transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full px-6 py-2 inline-block"
>
  Opciones de Administrador
</a>
    </div>
  );
};

export default VideoActions;
