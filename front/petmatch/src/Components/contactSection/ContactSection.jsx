import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ConfettiGenerator from "confetti-js";

function ContactSection() {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    const confettiRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: "¡Muy bien!",
            text: "Te responderemos a la brevedad",
            icon: "success",
        }).then(() => {
            // Initialize confetti
            const confettiSettings = { target: confettiRef.current };
            const confetti = new ConfettiGenerator(confettiSettings);
            confetti.render();

            // Stop confetti after 5 seconds
            setTimeout(() => {
                confetti.clear();
            }, 5000);
        });
    };

    return (
        // <section>
        <section className='w-full bg-bgPrincipal'>
            <div className='flex mx-auto max-w-screen-xl lg:flex-nowrap flex-wrap items-start justify-evenly p-4 sm:p-6'>
                <div className='lg:w-1/2 w-full p-4 sm:p-10' data-aos='fade-right'>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Nombre y Apellido *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-right'
                            data-aos-delay='100'
                            required
                        />
                        <input
                            type='tel'
                            placeholder='Teléfono *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-left'
                            data-aos-delay='200'
                            required
                        />
                        <input
                            type='email'
                            placeholder='Correo electrónico *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-right'
                            data-aos-delay='300'
                            required
                        />
                        <input
                            type='text'
                            placeholder='Asunto *'
                            className='outline-gray-400 outline-1 w-full p-4 border rounded'
                            data-aos='fade-up-left'
                            data-aos-delay='400'
                            required
                        />
                        <textarea
                            placeholder='Escribe tu mensaje...'
                            className='w-full p-4 border rounded h-32 outline-gray-400 outline-1'
                            data-aos='zoom-in'
                            data-aos-delay='500'
                            required></textarea>
                        <button
                            type='submit'
                            className='w-full bg-bgGreen text-white py-4 px-4 rounded'
                            data-aos='flip-up'
                            data-aos-delay='600'>
                            ¡Enviar Mensaje!
                        </button>
                    </form>
                </div>
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
                        onClick={() => navigate("About-Us")}
                        className='bg-bgGreen text-white py-4 px-6 rounded'
                        data-aos='flip-left'
                        data-aos-delay='200'>
                        Acerca de nosotros
                    </button>
                </div>
            </div>
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

export default ContactSection;
