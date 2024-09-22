import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de que tienes react-router-dom instalado

const FilterPetById = () => {
  const [petId, setPetId] = useState('');
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPetId(e.target.value);
  };

  const fetchPetById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/pets/${petId}`);
      if (response.ok) {
        const data = await response.json();
        setPet(data);
        setError(''); // Clear any previous error
      } else {
        setPet(null);
        setError('No se encontró una mascota con ese ID.');
      }
    } catch (error) {
      setPet(null);
      setError('Error al obtener la mascota.');
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
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-3xl font-bold">Filtrar Mascota por ID</h2>
          <p className="text-sm mt-1">Ingresa el ID de la mascota que deseas buscar</p>
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
            onClick={fetchPetById}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Buscar
          </button>
        </div>

        {/* Mostrar error si existe */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Mostrar información de la mascota si se encuentra */}
        {pet && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={pet.media.length > 0 ? pet.media[0].url : 'https://via.placeholder.com/150'}
              alt={pet.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{pet.name}</h3>
              <p><strong>ID:</strong> {pet.id}</p>
              <p><strong>Edad:</strong> {pet.age} años</p>
              <p><strong>Sexo:</strong> {pet.sex}</p>
              <p><strong>Peso:</strong> {pet.weight} kg</p>
              <p><strong>Tamaño:</strong> {JSON.stringify(pet.size)}</p>
              <p><strong>Tiempo en el refugio:</strong> {pet.time_at_the_shelter}</p>
              <p><strong>Historial de salud:</strong> {pet.health_history}</p>
              <p><strong>Salud:</strong> {JSON.stringify(pet.health)}</p>
              <p><strong>Personalidad:</strong> {pet.personality || 'No disponible'}</p>
              <p><strong>Raza:</strong> {pet.breed || 'No disponible'}</p>
              <p><strong>Especie:</strong> {pet.specie || 'No disponible'}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterPetById;
