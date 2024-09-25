import React, { useContext, useState } from "react"; // Importing React, useContext, and useState hooks
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom for navigation
import LogInImg from "../../Assets/AuthImg/LogInImg.png"; // Importing login image
import Swal from "sweetalert2"; // Importing SweetAlert2 for popup notifications
import PetsContext from "../../Context/GlobalContext"; // Importing the PetsContext for global state management

// Define the Login component
function Login() {
    const { setUserID } = useContext(PetsContext); // Using useContext to access setUserID function from global context
    const [formData, setFormData] = useState({
        email: "", // Initial state for email
        password: "", // Initial state for password
    });

    const [error, setError] = useState(""); // State to store error messages
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    // Handler to update formData state when input fields change
    const handleChange = (e) => {
        const { id, value } = e.target; // Destructure id and value from the input event
        setFormData((prevState) => ({
            ...prevState, // Spread the previous state
            [id]: value, // Update the changed field
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Make a POST request to login API endpoint
            const response = await fetch("https://back-pet-projectriwi-production.up.railway.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Set content type to JSON
                },
                body: JSON.stringify(formData), // Convert formData to JSON string
            });

            const data = await response.json(); // Parse response JSON

            if (response.ok) { // Check if the response status is 200 (success)
                if (data.access_token) {
                    localStorage.setItem("token", data.access_token); // Store the token in localStorage
                    Swal.fire({ // Show success notification using SweetAlert2
                        title: "Bienvenido de vuelta",
                        text: "Inicio de sesión exitoso",
                        icon: "success",
                    });

                    setUserID(data.data.id); // Update global userID context
                    navigate("/petcrud"); // Redirect to '/petcrud' page
                } else {
                    setError("Token no recibido"); // Set error if no token is received
                }
            } else {
                setError(data.message || "Error al iniciar sesión"); // Display error message from API or a default message
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error); // Log the error
            setError("Error del servidor"); // Display server error message
        }
    };

    return (
        <section className='min-h-screen grid grid-cols-2 items-center p-8'>
            {/* Left-side Text Section */}
            <div className='row-start-1 row-end-2 flex justify-center self-center mt-[2rem] pt-[2rem]'>
                <span className='text-7xl font-semibold text-[#416A32]'>
                    La Felicidad <br /> Empieza Aquí
                </span>
            </div>
            
            {/* Right-side Form Section */}
            <div className='row-span-2 justify-self-center self-start flex flex-col items-center gap-y-10 bg-white rounded-lg'>
                {/* Login Image */}
                <img
                    src={LogInImg}
                    alt='Imagen Crear Cuenta'
                    className='object-cover'
                />
                
                {/* Login Form */}
                <form
                    className='flex flex-col gap-y-5 w-[25rem]'
                    onSubmit={handleSubmit}>
                    <div>
                        {/* Email Input Field */}
                        <label
                            htmlFor='email'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Correo Electrónico
                        </label>
                        <input
                            type='email'
                            id='email'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            required
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </div>
                    <div>
                        {/* Password Input Field */}
                        <label
                            htmlFor='password'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Contraseña
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            required
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete='off'
                        />
                    </div>
                    {/* Display Error Message if any */}
                    {error && <div className='text-red-500'>{error}</div>}
                    
                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='text-white bg-[#416A32] outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mt-5'>
                        Iniciar Sesión
                    </button>
                </form>
                
                {/* Link to Sign-Up Page */}
                <button>
                    ¿No tienes una cuenta?{" "}
                    <Link
                        to='/Sign-Up'
                        className='text-[#2C7B10] hover:underline font-semibold'>
                        Crear cuenta
                    </Link>
                </button>
            </div>
        </section>
    );
}

// Export the Login component for use in other parts of the application
export default Login;
