import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const AllPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
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

  const handleOptionClick = () => {
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

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Listado de Mascotas</h1>
        <li className="list-none ml-auto mr-4"> {/* Quitamos bullets y usamos margen automático para alinear */}
        <Link
          to="/"
          className="text-lg font-bold no-underline" // Sin decoración por defecto
          aria-current="page"
        >
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
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToCreate(); handleOptionClick(); }}
                >
                  Crear Mascota
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToGetAll(); handleOptionClick(); }}
                >
                  Obtener Todas las Mascotas
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToGetById(); handleOptionClick(); }}
                >
                  Filtrar por ID
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToDelete(); handleOptionClick(); }}
                >
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
              <p><strong>Tamaño:</strong> {JSON.stringify(pet.size)}</p>
              <p><strong>Tiempo en el refugio:</strong> {pet.time_at_the_shelter}</p>
              <p><strong>Historial de salud:</strong> {pet.health_history}</p>
              <p><strong>Salud:</strong> {JSON.stringify(pet.health)}</p>
              <p><strong>Personalidad:</strong> {pet.personality || 'No disponible'}</p>
              <p><strong>Raza:</strong> {pet.breed || 'No disponible'}</p>
              <p><strong>Especie:</strong> {pet.specie || 'No disponible'}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllPets;

