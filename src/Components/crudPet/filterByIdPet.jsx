import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Modal component to display pet details
const PetDetailModal = ({ pet, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-5 rounded-lg'>
        <h2 className='text-lg font-bold'>{pet.name}</h2>
        <img src={pet.media?.[0]?.url || 'https://via.placeholder.com/150'} alt={pet.name} className='w-full h-48 object-cover' />
        
        <div className='mt-4'>
          {/* Display pet information */}
          <p><strong>ID:</strong> {pet.id}</p>
          <p><strong>Age:</strong> {pet.age} years</p>
          <p><strong>Sex:</strong> {pet.sex}</p>
          <p><strong>Weight:</strong> {pet.weight} kg</p>
          <p><strong>Size:</strong> {pet.size.current}</p>
          <p><strong>Time in Shelter:</strong> {pet.time_at_the_shelter}</p>
          <p><strong>Health History:</strong> {pet.health_history}</p>
          <p><strong>Personality:</strong> {pet.personality || 'Not available'}</p>
        </div>

        <button className='mt-4 bg-red-500 text-white p-2 rounded' onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

// Main component for filtering pets by ID
const FilterPetById = () => {
  // State definitions
  const [petId, setPetId] = useState(''); // ID of the pet to search
  const [pet, setPet] = useState(null); // Selected pet data
  const [error, setError] = useState(''); // Error message if pet not found
  const [menuVisible, setMenuVisible] = useState(false); // Toggle for navigation menu
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const navigate = useNavigate(); // Hook for navigation

  // Function to toggle the visibility of the navigation menu
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  // Function to handle input change for pet ID
  const handleInputChange = (e) => {
    setPetId(e.target.value);
  };

  // Function to fetch pet data by ID
  const fetchPetById = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage
    try {
      const response = await fetch(`https://back-pet-projectriwi-production.up.railway.app/pets/${petId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Add token to the request header
        },
      });
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        setPet(data); // Set pet data in state
        setError(''); // Clear any previous errors
        setIsOpen(true); // Open the modal to display pet details
      } else {
        setPet(null); // Clear pet state if not found
        setError('No pet found with that ID.'); // Set error message
      }
    } catch (error) {
      setPet(null); // Clear pet state on error
      setError('Error fetching pet data.'); // Set error message
      console.error('Network error:', error); // Log the error
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setPet(null); // Clear pet state
    setIsOpen(false); // Close the modal
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Search Pet by ID</h1>
        <li className="list-none ml-auto mr-4">
          <Link to="/" className="text-lg font-bold no-underline" aria-current="page">
            Home
          </Link>
        </li>
        <button onClick={toggleMenu} className="focus:outline-none">
          {/* Icon for the menu button */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {/* Navigation menu for additional actions */}
      {menuVisible && (
        <nav className="bg-gray-400 text-white p-4">
          <ul>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud'); toggleMenu(); }}>Create Pet</button>
            </li>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud/allPets'); toggleMenu(); }}>Get All Pets</button>
            </li>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud/allPets/byid'); toggleMenu(); }}>Filter by ID</button>
            </li>
            <li className="mb-2">
              <button onClick={() => { navigate('/petcrud/delete'); toggleMenu(); }}>Delete Pet</button>
            </li>
          </ul>
        </nav>
      )}

      <div className="max-w-lg mx-auto p-4">
        {/* Input field to enter pet ID */}
        <input
          type="text"
          placeholder="Enter pet ID"
          value={petId}
          onChange={handleInputChange}
          className="border rounded p-2 w-full mb-4"
        />
        {/* Button to fetch pet by ID */}
        <button
          onClick={fetchPetById}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Search
        </button>

        {/* Display error message if there is one */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Render the pet detail modal if the modal is open and a pet is found */}
        {isOpen && pet && <PetDetailModal pet={pet} onClose={handleCloseModal} />}
      </div>
    </>
  );
};

export default FilterPetById;
