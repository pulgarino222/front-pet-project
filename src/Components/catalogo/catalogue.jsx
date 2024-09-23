import React, { useEffect, useState } from 'react';

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
              <p className='text-sm text-gray-700'><strong>Tamaño Actual:</strong> {pet.size?.current}</p>
              <p className='text-sm text-gray-700'><strong>Tamaño Estimado:</strong> {pet.size?.estimated}</p>
              <p className='text-sm text-gray-700'><strong>Especie:</strong> {pet.specie?.name}</p>
              <p className='text-sm text-gray-700'><strong>Raza:</strong> {pet.breed}</p>
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

const PetCatalog = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredPets, setFilteredPets] = useState([]);
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3001/pets');
        if (!response.ok) {
          throw new Error('Error fetching pets');
        }
        const data = await response.json();
        setPets(data);
        setFilteredPets(data); // Inicialmente, todos los datos son visibles
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleFilterChange = () => {
    setFilteredPets(
      pets.filter(pet => 
        (speciesFilter ? pet.specie?.name === speciesFilter : true) &&
        (sizeFilter ? pet.size?.estimated === sizeFilter : true)
      )
    );
  };

  useEffect(() => {
    handleFilterChange();
  }, [speciesFilter, sizeFilter, pets]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleShowDetails = (pet) => {
    setSelectedPet(pet);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPet(null);
    setIsOpen(false);
  };

  return (
    <section className='flex justify-between items-start bg-white w-[90%] rounded-lg shadow-md m-auto my-10 p-10 max-w-screen-xl relative'>
      <aside className='w-1/4'>
        <h3 className='font-semibold text-lg mb-4'>Filtrar por</h3>
        
        <div className='mb-4'>
          <h4 className='font-semibold'>Especie</h4>
          <select 
            value={speciesFilter} 
            onChange={(e) => setSpeciesFilter(e.target.value)} 
            className='w-full border rounded p-2'
          >
            <option value=''>Selecciona una especie</option>
            <option value='perro'>Perro</option>
            <option value='gato'>Gato</option>
          </select>
        </div>

        <div>
          <h4 className='font-semibold'>Tamaño</h4>
          <select 
            value={sizeFilter} 
            onChange={(e) => setSizeFilter(e.target.value)} 
            className='w-full border rounded p-2'
          >
            <option value=''>Selecciona un tamaño</option>
            <option value='pequeño'>Pequeño</option>
            <option value='mediano'>Mediano</option>
            <option value='grande'>Grande</option>
            <option value='desconocido'>Desconocido</option>
          </select>
        </div>
      </aside>

      <div className='lg:w-2/3'>
        <div className='mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8'>
          <div className='flex justify-between mb-5'>
            <h2 className='font-semibold text-xl'>Catálogo de Mascotas</h2>
            <span className='font-light text-xs'>{filteredPets.length} Compañeros Encontrados</span>
          </div>
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8'>
            {filteredPets.map((pet) => (
              <div key={pet.id} className='p-3 bg-gray-100 shadow-md rounded-md space-y-3'>
                <a className='group'>
                  <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg xl:aspect-h-8 xl:aspect-w-7'>
                    <img
                      alt={pet.name}
                      src={pet.media?.[0]?.url || 'https://via.placeholder.com/220x180'}
                      className='h-[180px] w-[220px] object-cover object-center group-hover:opacity-75'
                    />
                  </div>
                  <div className='flex items-start justify-between p-2 mt-1'>
                    <h3 className='text-sm text-gray-700'>{pet.name}</h3>
                    <div className='flex items-center space-x-2'>
                      <p className='text-xs font-light'>{pet.sex}</p>
                      <p className='text-sm font-light'>{pet.age} años</p>
                    </div>
                  </div>
                </a>
                <button
                  onClick={() => handleShowDetails(pet)}
                  className='bg-[#5DA045] flex items-center justify-center py-2 rounded-3xl w-full text-white'>
                  ¡Conócelo!
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpen && selectedPet && <Modal pet={selectedPet} onClose={handleCloseModal} />}
    </section>
  );
};

export default PetCatalog;







