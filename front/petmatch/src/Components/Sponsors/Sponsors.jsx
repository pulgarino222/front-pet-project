import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SponsorCard from "./SponsorCard";


// Importa las imágenes locales
import imagen1 from '../../images/patrocinador1.jfif';
import imagen2 from '../../images/patrocinador2.jpg';
import imagen3 from '../../images/patrocinador3.png';
import imagen4 from '../../images/patrocinador4.jpg';
import imagen5 from '../../images/patrocinador5.png';

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

   
    const sponsors = [
        {
            name: "NutreCAN",
            comment: "En NutreCAN, nos enorgullece colaborar con PAM para asegurar que cada mascota adoptada reciba la nutrición que merece.",
            img: imagen1
        },
        {
            name: "Cat Chow",
            comment: "Junto a PAM, Cat Chow se compromete a proporcionar alimentos de calidad para las mascotas recién adoptadas.",
            img: imagen2
        },
        {
            name: "Dog Chow",
            comment: "Dog Chow se une a PAM en su misión de encontrar hogares amorosos, ofreciendo nutrición científica para cada etapa de vida.",
            img: imagen3
        },
        {
            name: "Mirringo",
            comment: "Mirringo apoya a PAM en su labor de adopción, asegurando que cada gato tenga una vida saludable y feliz.",
            img: imagen4
        },
        {
            name: "Pedigree",
            comment: "Pedigree se enorgullece de patrocinar a PAM, ayudando a que los perros adoptados disfruten de una alimentación deliciosa y nutritiva.",
            img: imagen5
        },
    ];

    return (
        <section
            id='Sponsors'
            className='bg-[#D1E0CB] lg:py-28 md:py-20 py-16 overflow-hidden'>
            <h3 className='text-[#416A32] lg:text-5xl text-3xl text-center font-bold md:pb-16 pb-10'>
                Patrocinadores
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