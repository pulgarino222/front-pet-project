import React, { useEffect } from "react"; // Import React and useEffect hook
import AOS from "aos"; // Import AOS library for animations
import "aos/dist/aos.css"; // Import AOS styles
import Slider from "react-slick"; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Import slick carousel theme styles
import SponsorCard from "./SponsorCard"; // Import the SponsorCard component

// Import local images for sponsors
import imagen1 from '../../images/patrocinador1.jfif';
import imagen2 from '../../images/patrocinador2.jpg';
import imagen3 from '../../images/patrocinador3.png';
import imagen4 from '../../images/patrocinador4.jpg';
import imagen5 from '../../images/patrocinador5.png';

function Sponsors() {
    // Initialize AOS animations when the component mounts
    useEffect(() => {
        AOS.init({
            duration: 1000, // Set animation duration
        });
    }, []);

    // Configuration settings for the Slider component
    const settings = {
        dots: false, // Disable dots navigation
        infinite: true, // Enable infinite scrolling
        speed: 10000, // Set the speed of the sliding animation
        slidesToShow: 3, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll at a time
        autoplay: true, // Enable autoplay
        autoplaySpeed: 0, // Set the autoplay speed to 0 for continuous scroll
        cssEase: "linear", // Set the easing function for the transition
        pauseOnHover: false, // Disable pause on hover
    };

    // Array of sponsor data
    const sponsors = [
        {
            name: "NutreCAN", // Sponsor name
            comment: "En NutreCAN, nos enorgullece colaborar con PAM para asegurar que cada mascota adoptada reciba la nutrición que merece.", // Sponsor comment
            img: imagen1 // Sponsor image
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
            id='Sponsors' // ID for the section
            className='bg-[#D1E0CB] lg:py-28 md:py-20 py-16 overflow-hidden'>
            <h3 className='text-[#416A32] lg:text-5xl text-3xl text-center font-bold md:pb-16 pb-10'>
                Patrocinadores {/* Section title */}
            </h3>
            <section
                className='mx-auto max-w-screen-xl rounded-2xl px-8 relative'
                data-aos='zoom-out-up'> {/* Animation on section entrance */}
                <Slider {...settings}> {/* Slider component with settings */}
                    {sponsors.map((test, index) => (
                        <div
                            key={index} // Unique key for each sponsor
                            data-aos='fade-up' // Animation for each card
                            data-aos-delay={index * 100}> {/* Delay based on index */}
                            <SponsorCard
                                key={index} // Unique key for the SponsorCard
                                data={test} // Pass sponsor data to the SponsorCard
                            />
                        </div>
                    ))}
                </Slider>
            </section>
        </section>
    );
}

export default Sponsors; // Export the Sponsors component
