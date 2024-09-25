import React, { useState } from 'react'; // Importing React and useState for managing state
import { useNavigate, Link } from 'react-router-dom'; // Importing useNavigate and Link for navigation
import jwtDecode from 'jwt-decode'; // Importing jwtDecode for decoding JWT tokens

const PetForm = () => {
  const navigate = useNavigate(); // Initializing useNavigate for redirecting

  // Function to get user ID from the stored JWT token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token'); // Retrieving the token from local storage
    if (token) {
      const decoded = jwtDecode(token); // Decoding the token
      return decoded.id; // Returning the user ID
    }
    return ''; // Returning an empty string if no token exists
  };

  // Initial state for the form
  const [formData, setFormData] = useState({
    name: '', // Pet's name
    age: '', // Pet's age
    sex: 'macho', // Default value for sex (male)
    size: { current: 'pequeño', estimated: 'desconocido' }, // Initial size values (current and estimated)
    weight: '', // Pet's weight
    time_at_the_shelter: '', // Time spent at the shelter
    health_history: '', // Health history of the pet
    health: {
      previous_treatments: '', // Previous treatments the pet received
      dewormed: 'no', // Dewormed status
      medical_necessity: '', // Any medical necessities
      sterilization: 'no', // Sterilization status
      vaccines: '', // Vaccination details
    },
    personality: '', // Pet's personality traits
    breed: '', // Pet's breed
    specie: '', // Pet's species
    image: null, // To store the selected image
  });

  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the modal
  const [menuVisible, setMenuVisible] = useState(false); // State to control the visibility of the menu

  // Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuring name and value from the event
    if (name === 'specie') {
      // If the field is 'specie', assign a specific ID
      const selectedId = value === 'perro' ? '574b20aa-7932-11ef-84d4-cecd028ee826' : '574b20aa-7932-11ef-84d4-cecd028ee826';
      setFormData((prev) => ({ ...prev, specie: selectedId })); // Updating the state with selected specie ID
    } else {
      // Updating other fields in the form data
      setFormData((prev) => ({ ...prev, [name]: value })); // General state update for other fields
    }
  };

  // Function to handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Getting the selected file
    setFormData((prev) => ({ ...prev, image: file })); // Updating the state with the selected image
  };

  // Function to submit the form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    const userId = getUserIdFromToken(); // Getting the user ID from the token

    // Preparing form data for submission
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('age', formData.age);
    submitData.append('sex', formData.sex);
    submitData.append('current_size', formData.size.current);
    submitData.append('estimated_size', formData.size.estimated);
    submitData.append('weight', formData.weight);
    submitData.append('time_at_the_shelter', formData.time_at_the_shelter);
    submitData.append('health_history', formData.health_history);
    submitData.append('previous_treatments', formData.health.previous_treatments);
    submitData.append('dewormed', formData.health.dewormed);
    submitData.append('medical_necessity', formData.health.medical_necessity);
    submitData.append('sterilization', formData.health.sterilization);
    submitData.append('vaccines', formData.health.vaccines);
    submitData.append('personality', formData.personality);
    submitData.append('breed', formData.breed);
    submitData.append('specie', formData.specie);
    submitData.append('image', formData.image); // Adding the image to the form data

    try {
      const response = await fetch(`http://localhost:3000/pets/user/${userId}`, {
        method: 'POST',
        body: submitData, // Sending the form data
      });
      if (response.ok) {
        // If the response is successful, redirect to another page
        navigate('/pet-list'); // Redirecting to the pet list page
      } else {
        // Handle errors if the submission fails
        console.error('Failed to submit form:', response.statusText);
      }
    } catch (error) {
      // Catching any errors during the fetch request
      console.error('Error submitting form:', error);
    }
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible); // Toggling the modal's visibility state
  };

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // Toggling the menu's visibility state
  };

  return (
    <div>
      {/* Form for adding a new pet */}
      <h1>Add a New Pet</h1>
      <form onSubmit={handleSubmit}> {/* Handling form submission */}
        <input type="text" name="name" placeholder="Pet Name" onChange={handleChange} required /> {/* Input for pet name */}
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required /> {/* Input for age */}
        <select name="sex" onChange={handleChange}> {/* Dropdown for selecting sex */}
          <option value="macho">Male</option> {/* Male option */}
          <option value="hembra">Female</option> {/* Female option */}
        </select>
        <input type="text" name="current_size" placeholder="Current Size" onChange={handleChange} required /> {/* Input for current size */}
        <input type="text" name="estimated_size" placeholder="Estimated Size" onChange={handleChange} required /> {/* Input for estimated size */}
        <input type="number" name="weight" placeholder="Weight" onChange={handleChange} required /> {/* Input for weight */}
        <input type="number" name="time_at_the_shelter" placeholder="Time at Shelter (days)" onChange={handleChange} required /> {/* Input for time at shelter */}
        <textarea name="health_history" placeholder="Health History" onChange={handleChange} /> {/* Textarea for health history */}
        <input type="text" name="previous_treatments" placeholder="Previous Treatments" onChange={handleChange} /> {/* Input for previous treatments */}
        <select name="dewormed" onChange={handleChange}> {/* Dropdown for dewormed status */}
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <input type="text" name="medical_necessity" placeholder="Medical Necessity" onChange={handleChange} /> {/* Input for medical necessity */}
        <select name="sterilization" onChange={handleChange}> {/* Dropdown for sterilization status */}
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        <input type="text" name="vaccines" placeholder="Vaccines" onChange={handleChange} /> {/* Input for vaccines */}
        <textarea name="personality" placeholder="Personality Traits" onChange={handleChange} /> {/* Textarea for personality */}
        <input type="text" name="breed" placeholder="Breed" onChange={handleChange} required /> {/* Input for breed */}
        <select name="specie" onChange={handleChange}> {/* Dropdown for species */}
          <option value="perro">Dog</option> {/* Dog option */}
          <option value="gato">Cat</option> {/* Cat option */}
        </select>
        <input type="file" name="image" onChange={handleImageChange} /> {/* File input for selecting an image */}
        <button type="submit">Submit</button> {/* Submit button */}
      </form>
      <button onClick={toggleModal}>Toggle Modal</button> {/* Button to toggle modal */}
      <button onClick={toggleMenu}>Toggle Menu</button> {/* Button to toggle menu */}
      {modalVisible && <div>Modal Content Here</div>} {/* Conditional rendering of the modal */}
      {menuVisible && <div>Menu Content Here</div>} {/* Conditional rendering of the menu */}
    </div>
  );
};

export default PetForm; // Exporting the PetForm component
