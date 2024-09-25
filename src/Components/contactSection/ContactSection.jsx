import React, { useEffect, useRef, useState } from "react"; // Importing React, useEffect, useRef, and useState hooks
import AOS from "aos"; // Importing AOS library for animations
import "aos/dist/aos.css"; // Importing AOS styles
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation
import Swal from "sweetalert2"; // Importing SweetAlert2 for notifications
import ConfettiGenerator from "confetti-js"; // Importing ConfettiGenerator for confetti effects
import emailjs from 'emailjs-com'; // Importing EmailJS to send emails

// Define the ContactSection component
function ContactSection() {
    const navigate = useNavigate(); // Initialize useNavigate for navigation
    const confettiRef = useRef(null); // useRef to manage the confetti canvas element

    // State to handle form data
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
    });

    // Initialize AOS (Animate on Scroll) when the component mounts
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration set to 1000ms (1 second)
            once: true, // Ensures animations run only once
        });
    }, []);

    // Handler to update form data as user inputs values
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the input event
        setFormData((prevData) => ({
            ...prevData, // Copy previous state
            [name]: value // Update the relevant field
        }));
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // EmailJS configuration details
        const serviceID = 'service_axp0b0c';  // Replace with your Service ID
        const templateID = 'template_e7fudra';  // Replace with your Template ID
        const userID = 'V6VSfKI3GXsVgnh8A';  // Replace with your User ID

        // Send email using EmailJS
        emailjs.send(serviceID, templateID, formData, userID)
            .then((response) => {
                // Show success alert using SweetAlert2
                Swal.fire({
                    title: "¡Muy bien!",
                    text: "Te responderemos a la brevedad",
                    icon: "success",
                }).then(() => {
                    // Start confetti animation after the success alert
                    const confettiSettings = { target: confettiRef.current };
                    const confetti = new ConfettiGenerator(confettiSettings);
                    confetti.render();

                    // Stop confetti animation after 5 seconds
                    setTimeout(() => {
                        confetti.clear();
                    }, 5000);
                });

                // Clear form data after successful submission
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    subject: '',
                    message: ''
                });

            }).catch((err) => {
                console.error('Error al enviar el mensaje:', err); // Log error to the console
                // Show error alert using SweetAlert2
                Swal.fire({
                    title: "Error",
                    text: "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                });
            });
    };

    return (
        <section className='w-full bg-bgPrincipal'>
            <div className='flex mx-auto max-w-screen-xl lg:flex-nowrap flex-wrap items-start justify-evenly p-4 sm:p-6'>
                {/* Contact Form Section */}
                <div className='lg:w-1/2 w-full p-4 sm:p-10' data-aos='fade-right'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        {/* Input for Name */}
                        <input
                            type='text'
                            name='name'
                            placeholder='Nombre y Apellido *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-right'
                            data-aos-delay='100'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        {/* Input for Phone */}
                        <input
                            type='tel'
                            name='phone'
                            placeholder='Teléfono *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-left'
                            data-aos-delay='200'
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        {/* Input for Email */}
                        <input
                            type='email'
                            name='email'
                            placeholder='Correo electrónico *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-right'
                            data-aos-delay='300'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {/* Input for Subject */}
                        <input
                            type='text'
                            name='subject'
                            placeholder='Asunto *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-left'
                            data-aos-delay='400'
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        {/* Textarea for Message */}
                        <textarea
                            name='message'
                            placeholder='Escribe tu mensaje...'
                            className='w-full p-4 border rounded h-32 outline-gray-400 outline-1'
                            data-aos='zoom-in'
                            data-aos-delay='500'
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='w-full bg-bgGreen text-white py-4 px-4 rounded'
                            data-aos='flip-up'
                            data-aos-delay='600'>
                            ¡Enviar Mensaje!
                        </button>
                    </form>
                </div>

                {/* Contact Information Section */}
                <div
                    className='lg:w-1/2 w-full p-4 sm:py-10 sm:px-4 mt-6 sm:mt-12 max-w-xl sm:max-w-2xl md:max-w-3xl flex flex-col items-center text-center space-y-6'
                    data-aos='fade-left'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-bgGreen'
                        data-aos='zoom-in-left'>
                        Contáctanos
                    </h1>
                    <p className='text-base sm:text-lg md:text-xl lg:text-lg text-gray-700'
                       data-aos='fade-up'>
                        ¿Quieres enviarnos un mensaje?
                        Llena el formulario y nos comunicaremos contigo lo más pronto posible. <br />
                        Puedes contactarnos a través de nuestras redes sociales. <br />
                        <br />
                        Tambien puedes saber más en:
                    </p>
                    <button
                        onClick={() => navigate("About-Us")} // Navigate to "About-Us" page
                        className='bg-bgGreen text-white py-4 px-6 rounded'
                        data-aos='flip-left'
                        data-aos-delay='200'>
                        Acerca de nosotros
                    </button>
                </div>
            </div>
            {/* Confetti canvas element */}
            <canvas
                ref={confettiRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 10,
                    pointerEvents: "none",
                    width: "100%",
                    height: "100vh",
                }}
            />
        </section>
    );
}

// Export the ContactSection component
export default ContactSection;
