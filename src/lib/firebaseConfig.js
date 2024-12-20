import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AlertWithInput from './AlertWithInput';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { app };

// Base de datos y almacenamiento
const storage = getStorage(app);
const db = getFirestore(app);

export { db };
export { storage };

// Función de inicio de sesión normal (postulante)
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log(user); // Aquí puedes manejar la información del usuario
  } catch (error) {
    console.error("Error al iniciar sesión con Google: ", error.message);
  }
};

// Función de inicio de sesión como empleador
export const signInWithGoogleEmpleador = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    console.log("UID del usuario autenticado:", user.uid);

    const q = query(collection(db, "userEmpleador"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log("El usuario es un empleador:", querySnapshot.docs[0].data());
      alert("Preste atencion su numero de cedula sera necesario para la recuperacion de su cuenta");
      prompt('Ingrese numero de cedula:');
      return "empleador";
    } else {
      console.log("El usuario no es un empleador, UID no encontrado:", user.uid);
      return "no-empleador";
    }
  } catch (error) {
    if (error.code === 'auth/popup-closed-by-user') {
      console.error("El usuario cerró el popup antes de completar el inicio de sesión.");
    } else if (error.code === 'auth/popup-blocked') {
      console.error("El popup fue bloqueado. Asegúrate de permitir popups en tu navegador.");
    } else {
      console.error("Error al verificar el rol de empleador:", error.message);
    }
    return "error";
  }
};
// Función para cerrar sesión
export const logOut = () => signOut(auth);

// Función para manejar la verificación y redirección dentro de un componente de React (Next.js)
export const handleGoogleSignIn = async () => {
  const status = await signInWithGoogleEmpleador();
  
  if (status === "empleador") {
    // Redirige a la página de empleadores, por ejemplo:
    window.location.href = '/dashboard-empleador';  // Cambia la URL según la página que desees
  } else if (status === "no-empleador") {
    // Redirige al formulario de registro de empleador:
    window.location.href = '/registro-empleador';
  } else {
    console.log("Hubo un error en la verificación");
  }
};
 