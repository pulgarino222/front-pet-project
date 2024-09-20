import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SponsorCard from "./TestimonialCard";


// Importa las imágenes locales
import imagen1 from '../../images/testimonio1.jpg';
import imagen2 from '../../images/testimonio2.webp';
import imagen3 from '../../images/testimonio3.jfif';

function Sponsors() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 10000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        cssEase: "linear",
        pauseOnHover: false,
    };

    // Datos de testimonios estáticos
    const sponsors = [
        {
            first_name: "Juan",
            last_name: "Pérez",
            comment: "PetMatch me ayudó a encontrar el compañero perfecto para mi familia. ¡Estamos muy felices!",
            img: imagen1
        },
        {
            first_name: "María",
            last_name: "González",
            comment: "Gracias a PetMatch, pude adoptar a mi adorable gato. El proceso fue fácil y rápido.",
            img: imagen2
        },
        {
            first_name: "Carlos",
            last_name: "Rodríguez",
            comment: "Excelente plataforma para conectar con mascotas que necesitan un hogar. Muy recomendado.",
            img: imagen3
        },
        {
            first_name: "Carlos",
            last_name: "Rodríguez",
            comment: "Excelente plataforma para conectar con mascotas que necesitan un hogar. Muy recomendado.",
            img: imagen3
        },
        {
            first_name: "Carlos",
            last_name: "Rodríguez",
            comment: "Excelente plataforma para conectar con mascotas que necesitan un hogar. Muy recomendado.",
            img: imagen2
        },
    ];

    return (
        <section
            id='Sponsors'
            className='bg-[#D1E0CB] lg:py-28 md:py-20 py-16 overflow-hidden'>
            <h3 className='text-[#416A32] lg:text-5xl text-3xl text-center font-bold md:pb-16 pb-10'>
                Testimonios
            </h3>
            <section
                className='mx-auto max-w-screen-xl rounded-2xl px-8 relative'
                data-aos='zoom-out-up'>
                <Slider {...settings}>
                    {sponsors.map((test, index) => (
                        <div
                            key={index}
                            data-aos='fade-up'
                            data-aos-delay={index * 100}>
                            <SponsorCard
                                key={index}
                                data={test}
                            />
                        </div>
                    ))}
                </Slider>
            </section>
        </section>
    );
}

export default Sponsors;