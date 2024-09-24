import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; 

const GetAllUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setError('No está autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await fetch('https://back-pet-projectriwi-production.up.railway.app/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los usuarios.');
      }

      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Obtener Todos los Usuarios</h1>
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


      <div className="max-w-4xl mx-auto p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Nombre</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Roles</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.entityName || 'N/A'}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">
                  {user.roles.length > 0 ? user.roles.map(role => role.name).join(', ') : 'Sin rol'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GetAllUser;

