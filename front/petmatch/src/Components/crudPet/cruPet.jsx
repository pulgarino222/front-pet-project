import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PetForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sex: 'macho',
    size: { current: '', estimated: '' },
    weight: '',
    time_at_the_shelter: '',
    health_history: '',
    health: {
      previous_treatments: '',
      dewormed: '',
      medical_necessity: '',
      sterilization: '',
      vaccines: '',
    },
    personality: '',
    userId: '',
    breedId: '',
    specieId: '',
    image: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('size.')) {
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
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:3001/pets/create', {
        method: 'POST',
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
      size: { current: '', estimated: '' },
      weight: '',
      time_at_the_shelter: '',
      health_history: '',
      health: {
        previous_treatments: '',
        dewormed: '',
        medical_necessity: '',
        sterilization: '',
        vaccines: '',
      },
      personality: '',
      userId: '',
      breedId: '',
      specieId: '',
      image: null,
    });
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const navigateToCreate = () => {
    navigate('/petcrud');
    setMenuVisible(false); // Cierra el menú al navegar
  };

  const navigateToGetAll = () => {
    navigate('/petcrud/allPets');
    setMenuVisible(false); // Cierra el menú al navegar
  };

  const handleOptionClick = () => {
    setMenuVisible(false); // Cierra el menú al hacer clic en una opción
  };

  const navigateToFilterById=()=>{
    navigate('/petcrud/allPets/byid')
    setMenuVisible(false)

  }


  const navigateToDelete=()=>{
    navigate('/petcrud/delete')
    setMenuVisible(false)

  }

  return (
    <>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Dashboard de Mascotas</h1>
        <button onClick={toggleMenu} className="focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </header>

      {menuVisible && (
        <nav className="bg-gray-700 text-white p-4">
          <ul>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToCreate(); handleOptionClick(); }}>
                Crear Mascota
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToGetAll(); handleOptionClick(); }}>
                Obtener Todas las Mascotas
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => { navigateToFilterById(); handleOptionClick(); }}>
                Filtrar por ID
              </button>
            </li>
            <li className="mb-2">
              <button className="w-full text-left" onClick={() => {navigateToDelete(); handleOptionClick(); }}>
                Eliminar Mascota
              </button>
            </li>
          </ul>
        </nav>
      )}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Crear Mascota</h2>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block mb-1">Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Edad</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Sexo</label>
          <select name="sex" value={formData.sex} onChange={handleChange} className="border p-2 w-full">
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tamaño actual</label>
          <select name="size.current" value={formData.size.current} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Seleccione</option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tamaño estimado</label>
          <select name="size.estimated" value={formData.size.estimated} onChange={handleChange} className="border p-2 w-full" required>
            <option value="">Seleccione</option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
            <option value="desconocido">Desconocido</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Peso</label>
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tiempo en el refugio</label>
          <input type="text" name="time_at_the_shelter" value={formData.time_at_the_shelter} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Historial de salud</label>
          <input type="text" name="health_history" value={formData.health_history} onChange={handleChange} className="border p-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tratamientos anteriores</label>
          <input type="text" name="health.previous_treatments" value={formData.health.previous_treatments} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Desparacitado</label>
          <input type="text" name="health.dewormed" value={formData.health.dewormed} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Necesidades médicas</label>
          <input type="text" name="health.medical_necessity" value={formData.health.medical_necessity} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Esterilizado</label>
          <input type="text" name="health.sterilization" value={formData.health.sterilization} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Vacunas</label>
          <input type="text" name="health.vaccines" value={formData.health.vaccines} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Personalidad</label>
          <input type="text" name="personality" value={formData.personality} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">ID de usuario</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">ID de raza</label>
          <input type="text" name="breedId" value={formData.breedId} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">ID de especie</label>
          <input type="text" name="specieId" value={formData.specieId} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Imagen</label>
          <input type="file" name="image" onChange={handleFileChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Crear Mascota</button>
      </form>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold">Mascota agregada</h2>
            <button onClick={closeModal} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PetForm;

