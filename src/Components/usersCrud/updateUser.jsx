import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"; 

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    entityName: '',
    email: '',
    city: '',
    adress: '',
    phone: '',
    whatsapp: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No está autenticado. Por favor, inicia sesión.');
      return;
    }

    try {
      const response = await fetch(`https://back-pet-projectriwi-production.up.railway.app/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error actualizando el usuario.');
      }

      setSuccess('Usuario actualizado correctamente.');
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Actualizar Usuario</h1>
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
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
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
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userId" className="block text-gray-700">
              ID del Usuario
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="entityName" className="block text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              id="entityName"
              name="entityName"
              value={userData.entityName}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-gray-700">
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="adress" className="block text-gray-700">
              Dirección
            </label>
            <input
              type="text"
              id="adress"
              name="adress"
              value={userData.adress}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-gray-700">
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="whatsapp" className="block text-gray-700">
              WhatsApp
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={userData.whatsapp}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded">
            Actualizar Usuario
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateUser;







