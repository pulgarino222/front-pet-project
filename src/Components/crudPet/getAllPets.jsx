import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Modal component to display pet details
const Modal = ({ pet, onClose }) => {
  const [showInfo, setShowInfo] = useState(false); // State to control the visibility of the Info dropdown
  const [showHealth, setShowHealth] = useState(false); // State to control the visibility of the Health dropdown
  const [showPersonality, setShowPersonality] = useState(false); // State to control the visibility of the Personality dropdown

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-lg font-bold'>{pet.name}</h2>
        <img src={pet.media?.[0]?.url || 'https://via.placeholder.com/150'} alt={pet.name} className='w-full h-48 object-cover' />
        
        <div className='mt-4'>
          {/* Dropdown for Pet Information */}
          <button onClick={() => setShowInfo(!showInfo)} className='text-left w-full font-semibold text-md border-b py-2'>
            Information
          </button>
          {showInfo && (
            <div className='pl-4'>
              <p className='text-sm text-gray-700'><strong>Age:</strong> {pet.age} years</p>
              <p className='text-sm text-gray-700'><strong>Sex:</strong> {pet.sex}</p>
              <p className='text-sm text-gray-700'><strong>Weight:</strong> {pet.weight} kg</p>
              <p className='text-sm text-gray-700'><strong>Size:</strong> {pet.size.current}</p>
              <p className='text-sm text-gray-700'><strong>Time at Shelter:</strong> {pet.time_at_the_shelter}</p>
            </div>
          )}

          {/* Dropdown for Health Information */}
          <button onClick={() => setShowHealth(!showHealth)} className='text-left w-full font-semibold text-md border-b py-2 mt-2'>
            Health
          </button>
          {showHealth && (
            <div className='pl-4'>
              <p className='text-sm text-gray-700'><strong>Health History:</strong> {pet.health_history}</p>
              <p className='text-sm text-gray-700'><strong>Previous Treatments:</strong> {pet.health.previous_treatments}</p>
              <p className='text-sm text-gray-700'><strong>Dewormed:</strong> {pet.health.dewormed}</p>
              <p className='text-sm text-gray-700'><strong>Medical Necessity:</strong> {pet.health.medical_necessity}</p>
              <p className='text-sm text-gray-700'><strong>Spayed/Neutered:</strong> {pet.health.sterilization}</p>
              <p className='text-sm text-gray-700'><strong>Vaccines:</strong> {pet.health.vaccines}</p>
            </div>
          )}

          {/* Dropdown for Personality Information */}
          <button onClick={() => setShowPersonality(!showPersonality)} className='text-left w-full font-semibold text-md border-b py-2 mt-2'>
            Personality
          </button>
          {showPersonality && (
            <div className='pl-4'>
              <p className='text-sm text-gray-700'><strong>Description:</strong> {pet.personality || 'Not specified'}</p>
            </div>
          )}
        </div>
        
        {/* Button to close the modal */}
        <button className='mt-4 bg-red-500 text-white p-2 rounded' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Main component for displaying all pets
const AllPets = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [pets, setPets] = useState([]); // State to store the list of pets
  const [menuVisible, setMenuVisible] = useState(false); // State to control the visibility of the navigation menu
  const [selectedPet, setSelectedPet] = useState(null); // State to store the currently selected pet
  const [isOpen, setIsOpen] = useState(false); // State to control the visibility of the modal

  // Toggle the visibility of the navigation menu
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Close the navigation menu after an option is selected
  const handleOptionClick = () => {
    setMenuVisible(false);
  };

  // Navigation functions for different routes
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

  // Fetch the list of pets from the API
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3001/pets');
        if (response.ok) {
          const data = await response.json();
          setPets(data); // Set the state with the fetched pet data
        } else {
          console.error('Error fetching pets');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchPets();
  }, []); // Run once on component mount

  // Show the modal with selected pet details
  const handleShowDetails = (pet) => {
    setSelectedPet(pet);
    setIsOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedPet(null);
    setIsOpen(false);
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Pet List</h1>
        <li className="list-none ml-auto mr-4">
          <Link to="/" className="text-lg font-bold no-underline" aria-current="page">
            Home
          </Link>
        </li>
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Navigation menu */}
      {menuVisible && (
        <nav className="bg-gray-400 text-white p-4">
          <ul>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToCreate(); handleOptionClick(); }}>
                Create Pet
              </button>
            </li>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToGetAll(); handleOptionClick(); }}>
                Get All Pets
              </button>
            </li>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToGetById(); handleOptionClick(); }}>
                Filter by ID
              </button>
            </li>
            <li className="mb-2">
              <button className="btn-custom w-full text-left" onClick={() => { navigateToDelete(); handleOptionClick(); }}>
                Delete Pet
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Display pets in a grid layout */}
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
              <p><strong>Age:</strong> {pet.age} years</p>
              <p><strong>Sex:</strong> {pet.sex}</p>
              <p><strong>Weight:</strong> {pet.weight} kg</p>
              <button 
                onClick={() => handleShowDetails(pet)} 
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for pet details */}
      {isOpen && selectedPet && (
        <Modal pet={selectedPet} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default AllPets;
