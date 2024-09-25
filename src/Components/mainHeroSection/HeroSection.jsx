import React, { useEffect } from "react";
import dogPerson from "../../images/personDog.png"; // Image of a person holding a dog
import { useNavigate } from "react-router-dom"; // Hook for navigation
import AOS from "aos"; // AOS (Animate On Scroll) library
import "aos/dist/aos.css"; // Import AOS CSS

function HeroSection() {
  const navigate = useNavigate(); // Initialize navigation hook

  useEffect(() => {
      AOS.init({ // Initialize AOS with specific settings
          duration: 1000, // Animation duration in milliseconds
          once: true, // Animation should happen only once
      });
  }, []);

  return (
    <main className='bg-bgPrincipal'>
        <section
            className='bg-contain bg-no-repeat bg-bottom flex md:flex-nowrap flex-wrap justify-center items-center pt-16 max-w-screen-xl mx-auto'
        >
            <figure className='md:w-1/2 w-full md:pt-0 pt-10' data-aos="fade-right">
                <img src={dogPerson} alt='A person holding a dog' /> {/* Display the image of the person with a dog */}
            </figure>
            <section className='max-w-xl text-left lg:w-1/2 md:w-3/5 w-full px-4' data-aos="fade-left">
                <h1 className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-bgGreen'
                    data-aos="zoom-in-left" data-aos-delay="200">
                    Adopting is giving purpose and love to a life that is waiting for you.
                </h1>
                <p className='mt-4 text-base sm:text-lg md:text-xl lg:text-lg text-black font-semibold'
                   data-aos="fade-up" data-aos-delay="400">
                    🌟 Give a pet the chance to know a home full of love and purpose. They will repay you with loyalty forever. <br/>
                    💖 By opening your heart and home, you help a pet find a second chance and improve your life with unconditional love.
                </p>
                <div className='mt-6 space-x-2 sm:space-x-4' data-aos="flip-up" data-aos-delay="600">
                    <button
                        onClick={() => navigate("/Catalogue")} // Navigate to the Catalogue page
                        className='bg-bgGreen text-white rounded-lg px-4 sm:px-6 py-2 hover:bg-[#89ac76] '>
                        Adopt a companion!
                    </button>
                </div>
            </section>
        </section>
    </main>
    );
}

export default HeroSection;
