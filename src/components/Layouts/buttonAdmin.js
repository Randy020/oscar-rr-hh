import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import VideoActions from './VideoActions'; // Importa el nuevo componente

const ActionButtons = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [docId, setDocId] = useState(null); // Simula un ID de documento
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, 'userAdmin'),
          where('uid', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsAdmin(true);
          // Simula obtener un docId de la colección "ofertas"
          const ofertasSnapshot = await getDocs(collection(db, 'ofertas'));
          if (!ofertasSnapshot.empty) {
            setDocId(ofertasSnapshot.docs[0].id); // Usa el primer documento como ejemplo
          }
        }
      }
    };

    checkAdminStatus();
  }, [auth, db]);

  if (!isAdmin || !docId) {
    return null; // No renderiza nada si no es admin o no hay docId
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <VideoActions docId={docId} />
    </div>
  );
};

export default ActionButtons;
