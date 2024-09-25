import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; 

const DeleteUser = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(prev => !prev);
  };

  const handleOptionClick = () => {
    setMenuVisible(false);
  };

  const navigateToDeleteUser = () => {
    navigate('/user/delete');
    setMenuVisible(false);
  };

  const navigateToGetAllUser = () => {
    navigate('/getall');
    setMenuVisible(false);
  };

  const navigateToGetByIdUser = () => {
    navigate('/Userbyid');
    setMenuVisible(false);
  };

  const navigateToUpdateUser = () => {
    navigate('/update');
    setMenuVisible(false);
  };

  const handleDelete = async () => {
    setMessage('');
    setError('');

    const token = localStorage.getItem('token');

    if (!token) {
      setError('No está autenticado. Por favor, inicia sesión.');
      return;
    }

    if (!userId) {
      setError('Por favor, ingrese el ID del usuario.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('Usuario eliminado con éxito.');
        setUserId(''); // Limpiar el campo del ID después de eliminar
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Error al eliminar el usuario.');
      }
    } catch (error) {
      setError('Error de red: ' + error.message);
    }
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Eliminar Usuario</h1>
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
                  onClick={() => { navigateToDeleteUser(); handleOptionClick(); }}
                >
                  Eliminar Usuario
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToGetAllUser(); handleOptionClick(); }}
                >
                  Obtener Todos los Usuarios
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToGetByIdUser(); handleOptionClick(); }}
                >
                  Obtener Usuario por ID
                </button>
              </li>
              <li className="mb-2">
                <button
                  className="btn-custom w-full text-left"
                  onClick={() => { navigateToUpdateUser(); handleOptionClick(); }}
                >
                  Actualizar Usuario
                </button>
              </li>
            </ul>
          </nav>
        )}


      <div className="max-w-md mx-auto p-4">
        <input
          type="text"
          placeholder="ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white rounded p-2 w-full"
        >
          Eliminar Usuario
        </button>

        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
};

export default DeleteUser;
