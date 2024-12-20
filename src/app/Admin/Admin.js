"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';


const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [docId, setDocId] = useState(null);
  const auth = getAuth();
  const db = getFirestore();
  const router = useRouter(); 

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
          const ofertasSnapshot = await getDocs(collection(db, 'ofertas'));
          if (!ofertasSnapshot.empty) {
            setDocId(ofertasSnapshot.docs[0].id);
          }
        } else {
          router.push('/'); // Redirige si no es administrador
        }
      } else {
        router.push('/'); // Redirige si no hay usuario autenticado
      }
    };

    checkAdminStatus();
  }, [auth, db, router]);

  if (!isAdmin || !docId) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga temporal
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <h1>Procesando su solicitud de acceso a Datos o elementos delicados Rstingidos</h1>
    </div>
  );
};

export default AdminPage;
