import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom
import { Link } from "react-router-dom"; 

const DeletePetById = () => {
  const [petId, setPetId] = useState(''); // State to hold the pet ID input
  const [error, setError] = useState(''); // State to hold error messages
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages
  const [menuVisible, setMenuVisible] = useState(false); // State to control menu visibility
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes for the pet ID
  const handleInputChange = (e) => {
    setPetId(e.target.value);
  };

  // Function to delete pet by ID
  const deletePetById = async () => {
    try {
      const response = await fetch(`https://back-pet-projectriwi-production.up.railway.app/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token from local storage for authorization
        },
      });
      if (response.ok) {
        setSuccessMessage('Mascota eliminada exitosamente.'); // Success message on successful deletion
        setError('');
      } else {
        setError('No se pudo eliminar la mascota. Asegúrate de que el ID es correcto.'); // Error message if deletion fails
        setSuccessMessage('');
      }
    } catch (error) {
      setError('Error al eliminar la mascota.'); // Network error message
      console.error('Network error:', error); // Log network errors to console
    }
  };

  // Navigation functions for different routes
  const navigateToCreate = () => {
    navigate('/petcrud'); // Navigate to create pet route
    setMenuVisible(false);
  };

  const navigateToGetAll = () => {
    navigate('/petcrud/allPets'); // Navigate to get all pets route
    setMenuVisible(false);
  };

  const navigateToFilterById = () => {
    navigate('/petcrud/allPets/byid'); // Navigate to filter by ID route
    setMenuVisible(false);
  };

  const navigateToDeleteById = () => {
    navigate('/petcrud/delete'); // Navigate to delete pet route
    setMenuVisible(false);
  };

  // Toggle the visibility of the navigation menu
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // Handle clicks on navigation options to close the menu
  const handleOptionClick = () => {
    setMenuVisible(false);
  };

  return (
    <>
      {/* Header added */}
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Pet Dashboard</h1>
        <li className="list-none ml-auto mr-4"> {/* Remove bullets and use auto margin for alignment */}
          <Link
            to="/"
            className="text-lg font-bold no-underline" // No underline decoration
            aria-current="page"
          >
            Home
          </Link>
        </li>
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

      {/* Navigation menu */}
      {menuVisible && (
        <nav className="bg-gray-400 text-white p-4">
          <ul>
            <li className="mb-2">
              <button
                className="btn-custom w-full text-left"
                onClick={() => { navigateToCreate(); handleOptionClick(); }}
              >
                Create Pet
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn-custom w-full text-left"
                onClick={() => { navigateToGetAll(); handleOptionClick(); }}
              >
                Get All Pets
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn-custom w-full text-left"
                onClick={() => { navigateToFilterById(); handleOptionClick(); }}
              >
                Filter by ID
              </button>
            </li>
            <li className="mb-2">
              <button
                className="btn-custom w-full text-left"
                onClick={() => { navigateToDeleteById(); handleOptionClick(); }}
              >
                Delete Pet
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div className="max-w-lg mx-auto p-4">
        {/* Styled header */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-3xl font-bold">Delete Pet by ID</h2>
          <p className="text-sm mt-1">Enter the ID of the pet you wish to delete</p>
        </div>

        {/* Input and Button */}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter pet ID"
            value={petId}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          />
          <button
            onClick={deletePetById}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>

        {/* Display error if exists */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {/* Display success message if exists */}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      </div>
    </>
  );
};

export default DeletePetById;
