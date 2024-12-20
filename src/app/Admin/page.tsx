"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { SubirDatosServicios1, SubirDatosServicios2, SubirDatosServicios3 } from "./SubirDatosServicios";
import { SubirDatosSN1, SubirDatosSN2, SubirDatosSN3 } from "./SubirDatosSN";
import { SubirDatosNC1, SubirDatosNC2, SubirDatosNC3 } from "./SubirDatosNC";
import { SubirDatosCE1, SubirDatosCE2, SubirDatosCE3 } from "./SubirDatosCE";
import CheckPaymentButton from "@/components/Chat/Admin";
import {ShopNowButtonP} from "@/components/Chat/publicidadC"

import { SubirDatosBG1, SubirDatosBG2, SubirDatosBG3, SubirDatosBG4 } from "./SubirDatosBG"; 

//Admin
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';





const Profile = () => {
   const [isAdmin, setIsAdmin] = useState(false);
   const [docId, setDocId] = useState<string | null>(null);
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
    <DefaultLayout>

      <div className="mx-auto w-full max-w-[970px]"> 
        <Breadcrumb pageName="Solo Admin" />
        <div>
          <br></br>
          <h1 className="text-xl font-bold mb-6 text-center">Cambiar publicidad Propia</h1>
<ShopNowButtonP/>
<h2 className="text-xl font-bold mb-6 text-center">Cambiar publicidad Comun</h2>
<CheckPaymentButton/>
          
      <h1 className="text-xl font-bold mb-6 text-center">Actualizar datos, Servicios Que ofrecemos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SubirDatosServicios1 />
        <SubirDatosServicios2 />
        <SubirDatosServicios3 />
      </div>
        <h1 className="text-xl font-bold mb-6 text-center">Actualizar datos, Sobre Nosotros</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SubirDatosSN1 />
        <SubirDatosSN2 />
        <SubirDatosSN3 />
      </div>
        <h1 className="text-xl font-bold mb-6 text-center">Actualizar datos, Lo que dicen nuestro clientes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SubirDatosNC1 />
        <SubirDatosNC2 />
        <SubirDatosNC3 />
      </div>
        <h1 className="text-xl font-bold mb-6 text-center">Actualizar datos, Casos de exitos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SubirDatosCE1 />
        <SubirDatosCE2 />
        <SubirDatosCE3 />
      </div>
        <h1 className="text-xl font-bold mb-6 text-center">Actualizar datos, Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SubirDatosBG1 />
        <SubirDatosBG2 />
        <SubirDatosBG3 />
        <SubirDatosBG4 />
      </div>
        </div>

        
      </div>
    </DefaultLayout>
  );
};

export default Profile;
