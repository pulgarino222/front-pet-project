import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const PetForm = () => {
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.id;
    }
    return '';
  };

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'macho',
    size: { current: 'pequeño', estimated: 'desconocido' },
    weight: '',
    time_at_the_shelter: '',
    health_history: '',
    health: {
      previous_treatments: '',
      dewormed: 'no',
      medical_necessity: '',
      sterilization: 'no',
      vaccines: '',
    },
    personality: '',
    breed: '',
    specie: '',
    image: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'specie') {
      const selectedId = value === 'perro' ? '574b20aa-7932-11ef-84d4-cecd028ee826' : '574b20aa-7932-11ef-84d4-cecd028ee826';
      setFormData((prev) => ({ ...prev, specie: selectedId }));
    } else if (name.startsWith('size.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        size: { ...prev.size, [field]: value },
      }));
    } else if (name.startsWith('health.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        health: { ...prev.health, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = getUserIdFromToken();
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (key === 'health') {
        for (const healthKey in formData.health) {
          formDataToSend.append(`health[${healthKey}]`, formData.health[healthKey]);
        }
      } else if (key === 'size') {
        for (const sizeKey in formData.size) {
          formDataToSend.append(`size[${sizeKey}]`, formData.size[sizeKey]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    formDataToSend.append('user', userId);

    try {
      const response = await fetch('http://localhost:3001/pets/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });
      if (response.ok) {
        const data = await response.json();
        setModalVisible(true);
      } else {
        console.error('Error en la creación de la mascota');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: '',
      age: '',
      sex: 'macho',
      size: { current: 'pequeño', estimated: 'desconocido' },
      weight: '',
      time_at_the_shelter: '',
      health_history: '',
      health: {
        previous_treatments: '',
        dewormed: 'no',
        medical_necessity: '',
        sterilization: 'no',
        vaccines: '',
      },
      personality: '',
      breed: '',
      specie: '',
      image: null,
    });
  };

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

  const handleOptionClick = () => {
    setMenuVisible(false);
  };

  const navigateToFilterById = () => {
    navigate('/petcrud/allPets/byid');
    setMenuVisible(false);
  };

  const navigateToDelete = () => {
    navigate('/petcrud/delete');
    setMenuVisible(false);
  };

  return (
    <>
      <header className="bg-gray-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Dashboard de Mascotas</h1>
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
              <button className="btn-custom w-full text-left" onClick={() => { navigateToFilterById(); handleOptionClick(); }}>
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

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
        <h2 className="text-2xl font-bold mb-4 md:col-span-2 text-center">Registro mascota</h2>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Edad</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Sexo</label>
          <select name="sex" value={formData.sex} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full">
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tamaño actual</label>
          <select name="size.current" value={formData.size.current} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tamaño estimado</label>
          <select name="size.estimated" value={formData.size.estimated} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
            <option value="desconocido">Desconocido</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Peso</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Tiempo en el refugio</label>
          <input type="text" name="time_at_the_shelter" value={formData.time_at_the_shelter} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Historial de salud</label>
          <textarea name="health_history" value={formData.health_history} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <h3 className="font-bold">Salud</h3>
          <label className="block mb-1 font-semibold">Tratamientos previos</label>
          <input type="text" name="health.previous_treatments" value={formData.health.previous_treatments} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />

          <label className="block mb-1 font-semibold">Desparacitado</label>
          <select name="health.dewormed" value={formData.health.dewormed} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full">
            <option value="sí">Sí</option>
            <option value="no">No</option>
          </select>

          <label className="block mb-1 font-semibold">Necesidad médica</label>
          <input type="text" name="health.medical_necessity" value={formData.health.medical_necessity} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />

          <label className="block mb-1 font-semibold">Esterilización</label>
          <select name="health.sterilization" value={formData.health.sterilization} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full">
            <option value="sí">Sí</option>
            <option value="no">No</option>
          </select>

          <label className="block mb-1 font-semibold">Vacunas</label>
          <input type="text" name="health.vaccines" value={formData.health.vaccines} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Personalidad</label>
          <input type="text" name="personality" value={formData.personality} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Raza</label>
          <input type="text" name="breed" value={formData.breed} onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Especie</label>
          <select name="specie" onChange={handleChange} className="border border-gray-300 p-2 rounded w-full" required>
            <option value="">Selecciona una especie</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Imagen</label>
          <input type="file" name="image" onChange={handleFileChange} className="border border-gray-300 p-2 rounded w-full" />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200">Registrar Mascota</button>
        </div>
      </form>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Mascota registrada exitosamente!</h2>
            <button onClick={closeModal} className="mt-4 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-200">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetForm;



