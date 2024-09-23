import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const PetDetailModal = ({ pet, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-lg font-bold'>{pet.name}</h2>
        <img src={pet.media?.[0]?.url || 'https://via.placeholder.com/150'} alt={pet.name} className='w-full h-48 object-cover' />
        
        <div className='mt-4'>
          <p><strong>ID:</strong> {pet.id}</p>
          <p><strong>Edad:</strong> {pet.age} años</p>
          <p><strong>Sexo:</strong> {pet.sex}</p>
          <p><strong>Peso:</strong> {pet.weight} kg</p>
          <p><strong>Tamaño:</strong> {pet.size.current}</p>
          <p><strong>Tiempo en el refugio:</strong> {pet.time_at_the_shelter}</p>
          <p><strong>Historial de salud:</strong> {pet.health_history}</p>
          <p><strong>Personalidad:</strong> {pet.personality || 'No disponible'}</p>
        </div>

        <button className='mt-4 bg-red-500 text-white p-2 rounded' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

const FilterPetById = () => {
  const [petId, setPetId] = useState('');
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setPetId(e.target.value);
  };

  const fetchPetById = async () => {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    try {
      const response = await fetch(`http://localhost:3001/pets/${petId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Agregar el token a la cabecera
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPet(data);
        setError(''); // Limpiar cualquier error previo
        setIsOpen(true); // Abrir el modal
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

  const handleCloseModal = () => {
    setPet(null);
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Buscar Mascota por ID</h1>
        <li className="list-none ml-auto mr-4">
          <Link to="/" className="text-lg font-bold no-underline" aria-current="page">
            Inicio
          </Link>
        </li>
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {menuVisible && (
        <nav className="bg-gray-400 text-white p-4">
          <ul>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud'); toggleMenu(); }}>Crear Mascota</button>
            </li>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud/allPets'); toggleMenu(); }}>Obtener Todas las Mascotas</button>
            </li>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud/allPets/byid'); toggleMenu(); }}>Filtrar por ID</button>
            </li>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud/delete'); toggleMenu(); }}>Eliminar Mascota</button>
            </li>
          </ul>
        </nav>
      )}

      <div className="max-w-lg mx-auto p-4">
        <input
          type="text"
          placeholder="Ingrese el ID de la mascota"
          value={petId}
          onChange={handleInputChange}
          className="border rounded p-2 w-full mb-4"
        />
        <button
          onClick={fetchPetById}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Buscar
        </button>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {isOpen && pet && <PetDetailModal pet={pet} onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default FilterPetById;


