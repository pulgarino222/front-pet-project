import React, { useState } from "react"; // Importing React and useState hook
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate for navigation
import CrearCuentaImg from "../../Assets/AuthImg/CrearCuentaImg.png"; // Importing the registration image
import Swal from "sweetalert2"; // Importing SweetAlert2 for showing alerts

// Define the Register component
function Register() {
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // State to store form data
    const [formData, setFormData] = useState({
        fullName: "", // User's full name
        email: "",    // User's email
        password: "", // User's password
        phone: "",    // User's phone number
        whatsapp: "", // User's WhatsApp number
        adress: "",   // User's address (spelling is 'adress' here as in the original code)
        roles: [],    // User's roles
        terms: false, // Acceptance of terms and conditions
    });

    // Function to handle changes in form input fields
    const handleChange = (e) => {
        const { id, value, checked, type } = e.target; // Destructure properties from the input event
        setFormData((prev) => ({
            ...prev, // Copy previous state
            [id]: type === "checkbox" ? checked : value, // Update the relevant property
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Default role ID to be assigned to all users
        const defaultRoleId = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

        try {
            // Sending a POST request to register the user
            const response = await fetch("https://back-pet-projectriwi-production.up.railway.app/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Setting the request content type as JSON
                },
                body: JSON.stringify({
                    entityName: formData.fullName, // User's full name
                    email: formData.email, // User's email
                    password: formData.password, // User's password
                    phone: Number(formData.phone), // User's phone converted to a number
                    whatsapp: Number(formData.whatsapp), // User's WhatsApp converted to a number
                    adress: formData.adress, // User's address
                    roles: [defaultRoleId, ...formData.roles], // Adding the default role ID and any additional roles
                }),
            });

            // Check if the response is successful
            if (response.ok) {
                Swal.fire({
                    title: "Éxito",
                    text: "Usuario creado exitosamente",
                    icon: "success",
                }).then(() => {
                    navigate("/Log-In"); // Navigate to the login page after successful registration
                });
            } else {
                const errorData = await response.json(); // Extract error message from the response
                Swal.fire({
                    title: "Ups",
                    text: errorData.message || "Ocurrió un error al crear el usuario",
                    icon: "error",
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Ups",
                text: "Ocurrió un error al crear el usuario",
                icon: "error",
            });
        }
    };

    return (
        <section className='min-h-screen grid grid-cols-2 items-center p-8'>
            {/* Left-side section with the heading */}
            <div className='row-start-1 row-end-2 flex justify-self-center self-end pt-[3rem] mt-[3rem]'>
                <span className='text-7xl font-semibold text-[#416A32]'>
                    La Felicidad <br /> Empieza Aquí
                </span>
            </div>
            
            {/* Right-side section containing the form */}
            <div className='row-span-2 justify-self-center self-start flex flex-col items-center gap-y-10 bg-white rounded-lg'>
                {/* Registration Image */}
                <img
                    src={CrearCuentaImg}
                    alt='Imagen Crear Cuenta'
                    className='object-cover'
                />

                {/* Registration Form */}
                <form className='flex flex-col gap-y-5 w-[25rem]' onSubmit={handleSubmit}>
                    {/* Full Name Input */}
                    <div>
                        <label
                            htmlFor='fullName'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Nombre Completo
                        </label>
                        <input
                            type='text'
                            id='fullName'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Correo Electrónico
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Phone Number Input */}
                    <div>
                        <label
                            htmlFor='phone'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Número de Teléfono
                        </label>
                        <input
                            type='tel'
                            id='phone'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* WhatsApp Number Input */}
                    <div>
                        <label
                            htmlFor='whatsapp'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Número de WhatsApp
                        </label>
                        <input
                            type='tel'
                            id='whatsapp'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            value={formData.whatsapp}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Address Input */}
                    <div>
                        <label
                            htmlFor='adress'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Dirección
                        </label>
                        <input
                            type='text'
                            id='adress'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            value={formData.adress}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Terms and Conditions Checkbox */}
                    <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                            <input
                                id='terms'
                                type='checkbox'
                                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
                                checked={formData.terms}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <label
                            htmlFor='terms'
                            className='ms-2 text-sm font-medium'>
                            Estoy de acuerdo con los{" "}
                            <a
                                href='/'
                                className='text-[#2C7B10] hover:underline font-semibold'>
                                términos y condiciones
                            </a>
                        </label>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='text-white bg-[#416A32] outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mt-5'>
                        Registrarse
                    </button>
                </form>
                
                {/* Link to Log In */}
                <button>
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        to='/Log-In'
                        className='text-[#2C7B10] hover:underline font-semibold'>
                        Inicia Sesión
                    </Link>
                </button>
            </div>
        </section>
    );
}

// Export the Register component
export default Register;
