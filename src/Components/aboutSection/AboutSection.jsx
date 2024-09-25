import React, { useEffect } from "react"; // Import React and useEffect hook
import AOS from "aos"; // Import AOS (Animate on Scroll) library
import "aos/dist/aos.css"; // Import AOS styles
import huella from "../../images/Huella.svg"; // Importing the 'huella' image
import perrito from "../../images/perrito.png"; // Importing the 'perrito' image
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook from React Router

// Define the functional component AboutSection
function AboutSection() {
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    // useEffect hook to initialize AOS (Animate on Scroll) when the component mounts
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration set to 1000ms (1 second)
        });
    }, []); // Empty dependency array means this runs once on component mount

    return (
        // Main section container with Tailwind CSS classes for layout and styling
        <section
            id='About-Us'
            className='bg-white relative py-24 mx-auto max-w-screen-xl flex justify-center items-center'>
            
            {/* Background Image (paw print) positioned absolutely */}
            <img
                className='absolute left-0 top-0 z-0'
                src={huella}
                alt='huella de perro'
            />
           
            {/* Main content wrapper: Contains text and image */}
            <div className='flex md:flex-nowrap flex-wrap w-full items-center justify-center z-10 relative px-6'>
                
                {/* Left-side content: Text and button */}
                <div
                    className='md:w-1/2 w-full p-4 lg:pl-20 md:pl-10 pl-0 max-w-xl sm:max-w-2xl md:max-w-3xl text-left'
                    data-aos='fade-up'> {/* Applying fade-up animation */}
                    
                    {/* Heading */}
                    <h1
                        className='text-3xl sm:text-4xl md:text-5xl font-bold text-bgGreen'
                        data-aos='fade-up'
                        data-aos-delay='100'>
                        ¿Quienes somos?
                    </h1>
                    
                    {/* Description Paragraph */}
                    <p
                        className='my-4 md:text-lg text-[#444444]'
                        data-aos='fade-up'
                        data-aos-delay='200'>
                        En PAM, conectamos fundaciones de rescate con personas dispuestas a adoptar mascotas, brindando un espacio donde pueden publicar animales disponibles para adopción. Facilitamos el proceso de encontrar un hogar amoroso, creyendo que cada mascota merece una segunda oportunidad. ¡Únete a nosotros y ayuda a cambiar una vida!
                    </p>
                    
                    {/* Button to navigate to the 'About Us' page */}
                    <button
                        onClick={() => navigate('/About-us')} // onClick handler for navigation
                        className='bg-bgGreen text-white py-2 px-4 rounded'
                        data-aos='fade-up'
                        data-aos-delay='300'>
                        ¡Conócenos!
                    </button>
                </div>
                
                {/* Right-side content: Image of the dog */}
                <div
                    className='md:w-1/2 md:pr-8 lg:pr-0 w-4/5 md:pt-0 pt-10'
                    data-aos='fade-up'
                    data-aos-delay='100'> {/* Applying fade-up animation */}
                    
                    {/* Displaying the dog image */}
                    <img
                        src={perrito}
                        className='max-w-full'
                        alt='perro front'
                    />
                </div>
            </div>
        </section>
    );
}

// Export the AboutSection component for use in other parts of the application
export default AboutSection;
