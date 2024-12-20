import React, { useState } from 'react';

const AlertWithInput = () => {
  const [showModal, setShowModal] = useState(true);
  const [cedula, setCedula] = useState('');

  const handleChange = (e) => {
    setCedula(e.target.value);
  };

  const handleClose = () => {
    setShowModal(false);
    console.log('Cédula ingresada:', cedula);
  };

  return (
    <div>
      {showModal && (
        <div style={modalStyle}>
          <h3>Ingrese su Cédula</h3>
          <input
            type="text"
            value={cedula}
            onChange={handleChange}
            placeholder="Cédula"
            style={inputStyle}
          />
          <button onClick={handleClose} style={buttonStyle}>
            Aceptar
          </button>
        </div>
      )}
    </div>
  );
};

// Estilos para el modal
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

// Estilos para el input
const inputStyle = {
  padding: '10px',
  marginTop: '10px',
  marginBottom: '10px',
  width: '200px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

// Estilos para el botón
const buttonStyle = {
  padding: '10px 15px',
  backgroundColor: '#007BFF',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AlertWithInput;
