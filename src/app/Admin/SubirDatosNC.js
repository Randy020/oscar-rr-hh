'use client';
import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, storage } from "@/lib/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const SubirDatosNC1 = () => {
  const [forms, setForms] = useState([{ id: Date.now(), title: '', contenido: '', imageFile: null }]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "textoNC", "apartado1");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { title, contenido } = docSnap.data();
          setForms([{ id: Date.now(), title, contenido, imageFile: null }]);
        } else {
          console.log("No se encontraron datos.");
        }
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, formId) => {
    const { name, value, files } = e.target;
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, [name]: files ? files[0] : value } : form
      )
    );
  };

  const handleSubmit = async (e, formId) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = forms.find((form) => form.id === formId);

    try {
      let downloadURL = '';

      if (formData.imageFile) {
        const storageRef = ref(storage, `imagenes/${formData.imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, formData.imageFile);
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      const docRef = doc(db, "textoNC", "apartado1");
      await setDoc(docRef, {
        title: formData.title,
        contenido: formData.contenido,
        ...(downloadURL && { image: downloadURL }),
      });

      setMessage('Datos guardados correctamente.');
      setModalVisible(true);
    } catch (error) {
      console.error('Error al subir los datos:', error);
      setMessage('Hubo un error al guardar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setForms([{ id: Date.now(), title: '', contenido: '', imageFile: null }]);
  };

  return (
    <div className="container mx-auto p-6">
      {forms.map((form) => (
        <div key={form.id} className="bg-white p-6 rounded-lg shadow-xl">
          <form onSubmit={(e) => handleSubmit(e, form.id)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
                placeholder="Introduce el título"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contenido</label>
              <textarea
                name="contenido"
                value={form.contenido}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
                placeholder="Escribe el contenido"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Imagen (opcional)</label>
              <br></br>
              <h1>Seleciona o Arastra tu curriculum Aqui</h1>
              <input
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Subir Datos'}
            </button>
          </form>
        </div>
      ))}

      {message && <p className="mt-4 text-center text-lg font-medium">{message}</p>}

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Datos Enviados</h2>
            <p>{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white p-3 rounded-md"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


export const SubirDatosNC2 = () => {
  const [forms, setForms] = useState([{ id: Date.now(), title: '', contenido: '', imageFile: null }]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "textoNC", "apartado2");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { title, contenido } = docSnap.data();
          setForms([{ id: Date.now(), title, contenido, imageFile: null }]);
        } else {
          console.log("No se encontraron datos.");
        }
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, formId) => {
    const { name, value, files } = e.target;
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, [name]: files ? files[0] : value } : form
      )
    );
  };

  const handleSubmit = async (e, formId) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = forms.find((form) => form.id === formId);

    try {
      let downloadURL = '';

      if (formData.imageFile) {
        const storageRef = ref(storage, `imagenes/${formData.imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, formData.imageFile);
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      const docRef = doc(db, "textoNC", "apartado2");
      await setDoc(docRef, {
        title: formData.title,
        contenido: formData.contenido,
        ...(downloadURL && { image: downloadURL }),
      });

      setMessage('Datos guardados correctamente.');
      setModalVisible(true);
    } catch (error) {
      console.error('Error al subir los datos:', error);
      setMessage('Hubo un error al guardar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setForms([{ id: Date.now(), title: '', contenido: '', imageFile: null }]);
  };

  return (
    <div className="container mx-auto p-6">
      {forms.map((form) => (
        <div key={form.id} className="bg-white p-6 rounded-lg shadow-xl">
          <form onSubmit={(e) => handleSubmit(e, form.id)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
                placeholder="Introduce el título"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contenido</label>
              <textarea
                name="contenido"
                value={form.contenido}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
                placeholder="Escribe el contenido"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Imagen (opcional)</label>
              <br></br>
              <h1>Seleciona o Arastra tu curriculum Aqui</h1>
              <input
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Subir Datos'}
            </button>
          </form>
        </div>
      ))}

      {message && <p className="mt-4 text-center text-lg font-medium">{message}</p>}

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Datos Enviados</h2>
            <p>{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white p-3 rounded-md"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const SubirDatosNC3 = () => {
  const [forms, setForms] = useState([{ id: Date.now(), title: '', contenido: '', imageFile: null }]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "textoNC", "apartado3");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { title, contenido } = docSnap.data();
          setForms([{ id: Date.now(), title, contenido, imageFile: null }]);
        } else {
          console.log("No se encontraron datos.");
        }
      } catch (error) {
        console.error("Error al recuperar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e, formId) => {
    const { name, value, files } = e.target;
    setForms((prevForms) =>
      prevForms.map((form) =>
        form.id === formId ? { ...form, [name]: files ? files[0] : value } : form
      )
    );
  };

  const handleSubmit = async (e, formId) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = forms.find((form) => form.id === formId);

    try {
      let downloadURL = '';

      if (formData.imageFile) {
        const storageRef = ref(storage, `imagenes/${formData.imageFile.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, formData.imageFile);
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      const docRef = doc(db, "textoNC", "apartado3");
      await setDoc(docRef, {
        title: formData.title,
        contenido: formData.contenido,
        ...(downloadURL && { image: downloadURL }),
      });

      setMessage('Datos guardados correctamente.');
      setModalVisible(true);
    } catch (error) {
      console.error('Error al subir los datos:', error);
      setMessage('Hubo un error al guardar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setForms([{ id: Date.now(), title: '', contenido: '', imageFile: null }]);
  };

  return (
    <div className="container mx-auto p-6">
      {forms.map((form) => (
        <div key={form.id} className="bg-white p-6 rounded-lg shadow-xl">
          <form onSubmit={(e) => handleSubmit(e, form.id)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
                placeholder="Introduce el título"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Contenido</label>
              <textarea
                name="contenido"
                value={form.contenido}
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
                placeholder="Escribe el contenido"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Imagen (opcional)</label>
              <br></br>
              <h1>Seleciona o Arastra tu curriculum Aqui</h1>
              <input
                type="file"
                accept="image/*"
                name="imageFile"
                onChange={(e) => handleInputChange(e, form.id)}
                className="w-full p-3 mt-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-md"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Subir Datos'}
            </button>
          </form>
        </div>
      ))}

      {message && <p className="mt-4 text-center text-lg font-medium">{message}</p>}

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-bold mb-4">Datos Enviados</h2>
            <p>{message}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white p-3 rounded-md"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};