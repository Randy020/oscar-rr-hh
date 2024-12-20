import React from 'react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Auth = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Login exitoso");
    } catch (error) {
      console.error("Error durante el login:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Auth;