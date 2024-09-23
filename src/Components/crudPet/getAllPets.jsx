import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Componente del modal para mostrar detalles de la mascota
const Modal = ({ pet, onClose }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showHealth, setShowHealth] = useState(false);
  const [showPersonality, setShowPersonality] = useState(false);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-lg font-bold'>{pet.name}</h2>
        <img src={pet.media?.[0]?.url || 'https://via.placeholder.com/150'} alt={pet.name} className='w-full h-48 object-cover' />
        
        <div className='mt-4'>
          {/* Dropdown de Información */}
          <button onClick={() => setShowInfo(!showInfo)} className='text-left w-full font-semibold text-md border-b py-2'>
            Información
          </button>
          {showInfo && (
            <div className='pl-4'>
              <p className='text-sm text-gray-700'><strong>Edad:</strong> {pet.age} años</p>
              <p className='text-sm text-gray-700'><strong>Sexo:</strong> {pet.sex}</p>
              <p className='text-sm text-gray-700'><strong>Peso:</strong> {pet.weight} kg</p>
              <p className='text-sm text-gray-700'><strong>Tamaño:</strong> {pet.size.current}</p>
              <p className='text-sm text-gray-700'><strong>Tiempo en el refugio:</strong> {pet.time_at_the_shelter}</p>
            </div>
          )}

          {/* Dropdown de Salud */}
          <button onClick={() => setShowHealth(!showHealth)} className='text-left w-full font-semibold text-md border-b py-2 mt-2'>
            Salud
          </button>
          {showHealth && (
            <div className='pl-4'>
              <p className='text-sm text-gray-700'><strong>Historial de salud:</strong> {pet.health_history}</p>
              <p className='text-sm text-gray-700'><strong>Tratamientos previos:</strong> {pet.health.previous_treatments}</p>
              <p className='text-sm text-gray-700'><strong>Desparacitado:</strong> {pet.health.dewormed}</p>
              <p className='text-sm text-gray-700'><strong>Necesidad médica:</strong> {pet.health.medical_necessity}</p>
              <p className='text-sm text-gray-700'><strong>Esterilización:</strong> {pet.health.sterilization}</p>
              <p className='text-sm text-gray-700'><strong>Vacunas:</strong> {pet.health.vaccines}</p>
            </div>
          )}

          {/* Dropdown de Personalidad */}
          <button onClick={() => setShowPersonality(!showPersonality)} className='text-left w-full font-semibold text-md border-b py-2 mt-2'>
            Personalidad
          </button>
          {showPersonality && (
            <div className='pl-4'>
              <p className='text-sm text-gray-700'><strong>Descripción:</strong> {pet.personality || 'No especificado'}</p>
            </div>
          )}
        </div>
        
        <button className='mt-4 bg-red-500 text-white p-2 rounded' onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

const AllPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleOptionClick = () => {
    setMenuVisible(false);
  };

  const navigateToCreate = () => {
    navigate('/petcrud');
    setMenuVisible(false);
  };

  const navigateToGetAll = () => {
    navigate('/petcrud/allPets');
    setMenuVisible(false);
  };

  const navigateToGetById = () => {
    navigate('/petcrud/allPets/byid');
    setMenuVisible(false);
  };

  const navigateToDelete = () => {
    navigate('/petcrud/delete');
    setMenuVisible(false);
  };

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3001/pets');
        if (response.ok) {
          const data = await response.json();
          setPets(data);
        } else {
          console.error('Error al obtener las mascotas');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    fetchPets();
  }, []);

  const handleShowDetails = (pet) => {
    setSelectedPet(pet);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Listado de Mascotas</h1>
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
              <button className="btn-custom w-full text-left" onClick={() => { navigateToCreate(); handleOptionClick(); }}>
                Crear Mascota
              </button>
            </li>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToGetAll(); handleOptionClick(); }}>
                Obtener Todas las Mascotas
              </button>
            </li>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToGetById(); handleOptionClick(); }}>
                Filtrar por ID
              </button>
            </li>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToDelete(); handleOptionClick(); }}>
                Eliminar Mascota
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
              <p><strong>Tamaño:</strong> {pet.size.current}</p>
              <button
                onClick={() => handleShowDetails(pet)}
                className='bg-[#5DA045] flex items-center justify-center py-2 rounded-3xl w-full text-white mt-2'>
                ¡Conócelo!
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {isOpen && selectedPet && <Modal pet={selectedPet} onClose={handleCloseModal} />}
    </>
  );
};

export default AllPets;

