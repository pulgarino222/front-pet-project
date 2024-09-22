import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de que tienes react-router-dom instalado

const DeletePetById = () => {
  const [petId, setPetId] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPetId(e.target.value);
  };

  const deletePetById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/pets/${petId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSuccessMessage('Mascota eliminada exitosamente.');
        setError('');
      } else {
        setError('No se pudo eliminar la mascota. Asegúrate de que el ID es correcto.');
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error al eliminar la mascota.');
      console.error('Error de red:', error);
    }
  };

  const navigateToCreate = () => {
    navigate('/petcrud');
    setMenuVisible(false);
  };

  const navigateToGetAll = () => {
    navigate('/petcrud/allPets');
    setMenuVisible(false);
  };

  const navigateToFilterById = () => {
    navigate('/petcrud/allPets/byid');
    setMenuVisible(false);
  };

  const navigateToDeleteById = () => {
    navigate('/petcrud/delete');
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleOptionClick = () => {
    setMenuVisible(false);
  };

  return (
    <>
      {/* Header agregado */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Dashboard de Mascotas</h1>
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {menuVisible && (
        <nav className="bg-gray-700 text-white p-4">
          <ul>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToCreate(); handleOptionClick(); }}>
                Crear Mascota
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToGetAll(); handleOptionClick(); }}>
                Obtener Todas las Mascotas
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToFilterById(); handleOptionClick(); }}>
                Filtrar por ID
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToDeleteById(); handleOptionClick(); }}>
                Eliminar Mascota
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div className="max-w-lg mx-auto p-4">
        {/* Header estilizado */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-3xl font-bold">Eliminar Mascota por ID</h2>
          <p className="text-sm mt-1">Ingresa el ID de la mascota que deseas eliminar</p>
        </div>

        {/* Entrada y Botón */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Ingrese el ID de la mascota"
            value={petId}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          <button
            onClick={deletePetById}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Eliminar
          </button>
        </div>

        {/* Mostrar error si existe */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {/* Mostrar mensaje de éxito si existe */}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      </div>
    </>
  );
};

export default DeletePetById;
