import React, { useEffect } from "react";
import dogPerson from "../../images/personDog.png";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function HeroSection() {
  const navigate = useNavigate();

  useEffect(() => {
      AOS.init({
          duration: 1000,
          once: true,
      });
  }, []);

  return (
    <main className='bg-bgPrincipal'>
        <section
            className='bg-contain bg-no-repeat bg-bottom flex md:flex-nowrap flex-wrap justify-center items-center pt-16 max-w-screen-xl mx-auto'
        >
            <figure className='md:w-1/2 w-full md:pt-0 pt-10' data-aos="fade-right">
                <img src={dogPerson} alt='A person holding a dog' />
            </figure>
            <section className='max-w-xl text-left lg:w-1/2 md:w-3/5 w-full px-4' data-aos="fade-left">
                <h1 className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-bgGreen'
                    data-aos="zoom-in-left" data-aos-delay="200">
                    Adoptar es dar propósito y amor a una vida que te está esperando.
                </h1>
                <p className='mt-4 text-base sm:text-lg md:text-xl lg:text-lg text-black font-semibold'
                   data-aos="fade-up" data-aos-delay="400">
                    🌟 Dale a una mascota la oportunidad de conocer un hogar lleno de amor y propósito. Ellos te devolverán su lealtad para siempre. <br/>
                    💖 Al abrir tu corazón y tu hogar, ayudas a una mascota a encontrar una segunda oportunidad y mejoras tu vida con amor incondicional.
                </p>
                <div className='mt-6 space-x-2 sm:space-x-4' data-aos="flip-up" data-aos-delay="600">
                    <button
                        onClick={() => navigate("/Catalogue")}
                        className='bg-bgGreen text-white rounded-lg px-4 sm:px-6 py-2 hover:bg-[#89ac76] '>
                        Ver Mascotas
                    </button>
                </div>
            </section>
        </section>
    </main>
    );
}

export default HeroSection;






