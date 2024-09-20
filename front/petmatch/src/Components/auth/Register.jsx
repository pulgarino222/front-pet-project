import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CrearCuentaImg from "../../Assets/AuthImg/CrearCuentaImg.png";
import Swal from "sweetalert2";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        terms: false,
    });

    const handleChange = (e) => {
        const { id, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realiza la solicitud de registro al backend
        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    entityName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            // Si la respuesta es exitosa, redirige al usuario
            if (response.ok) {
                Swal.fire({
                    title: "Éxito",
                    text: "Usuario creado exitosamente",
                    icon: "success",
                }).then(() => {
                    navigate("/Match");
                });
            } else {
                // Manejo genérico para errores
                Swal.fire({
                    title: "Ups",
                    text: "Ocurrió un error al crear el usuario",
                    icon: "error",
                });
            }
        } catch (error) {
            // Manejo genérico para errores de red
            Swal.fire({
                title: "Ups",
                text: "Ocurrió un error al crear el usuario",
                icon: "error",
            });
        }
    };

    return (
        <section className='min-h-screen grid grid-cols-2 items-center p-8'>
            <div className='row-start-1 row-end-2 flex justify-self-center self-end pt-[3rem] mt-[3rem]'>
                <span className='text-7xl font-semibold text-[#416A32]'>
                    La Felicidad <br /> Empieza Aquí
                </span>
            </div>
            <div className='row-span-2 justify-self-center self-start flex flex-col items-center gap-y-10 bg-white rounded-lg'>
                <img
                    src={CrearCuentaImg}
                    alt='Imagen Crear Cuenta'
                    className='object-cover'
                />

                <form className='flex flex-col gap-y-5 w-[25rem]' onSubmit={handleSubmit}>
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
                    <div>
                        <label
                            htmlFor='password'
                            className='block mb-2 text-sm font-medium text-black/40'>
                            Contraseña
                        </label>
                        <input
                            type='password'
                            id='password'
                            className='shadow-sm bg-transparent border border-[#9F9F9F] outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex items-start'>
                        <div className='flex items-center h-5'>
                            <input
                                id='terms'
                                type='checkbox'
                                value=''
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
                    <button
                        type='submit'
                        className='text-white bg-[#416A32] outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mt-5'>
                        Registrarse
                    </button>
                </form>
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

export default Register;


