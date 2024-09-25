import React from "react"; // Import React library
import deskImage from "../../images/deskImage.png"; // Importing images from the local directory
import dogs from "../../images/dogs.png";
import imagen2 from "../../images/imagen2aAP.png";
import imagen3 from "../../images/imagen3AP.png";
import Header from "../Header/Header"; // Importing the Header component
import Footer from "../Footer/Footer"; // Importing the Footer component
 
// Define the functional component AboutPage
function AboutPage() {
    return (
        // Main container with Tailwind CSS for font styling
        <div className='font-sans'> 
            {/* Include the Header component at the top of the page */}
            <Header /> 

            {/* First Section: Introduction */}
            <section className='bg-white py-24 mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center'>
                {/* Text container for the section */}
                <div className='text-left md:w-1/2 w-full p-4 lg:pl-0 md:pl-5 max-w-xl sm:max-w-2xl pl-5 md:max-w-full'>
                    <h1 className='text-5xl md:text-6xl font-bold leading-tight md:leading-tight mb-6'>
                        Tu guía completa para la adopción y cuidado de mascotas
                    </h1>
                    <p className='my-4 md:text-lg text-[#444444]'>
                        Somos una página que te ayuda a encontrar a tu compañero
                        de vida. Desde cómo preparar tu hogar para su llegada
                        hasta cómo cuidarlo y entrenarlo adecuadamente, estamos
                        aquí para ayudarte en cada paso del camino.
                    </p>
                </div>
                
                {/* Image container */}
                <div className='md:w-1/2 w-full flex justify-center'>
                    <img src={dogs} alt='Dogs' className='max-w-full h-auto' /> {/* Display dogs image */}
                </div>
            </section>

            {/* Second Section: About the origin */}
            <section className='bg-white py-10 mx-auto max-w-screen-xl flex flex-col lg:flex-row-reverse items-center'>
                {/* Text container with reverse flex direction for larger screens */}
                <div className='text-left md:w-1/2 w-full px-20 lg:pr-20 md:pr-10 pr-0 max-w-xl sm:max-w-2xl md:max-w-3xl'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-bgGreen'>
                        ¿Cómo nació?
                    </h1>
                    <p className='my-4 md:text-lg text-[#444444]'>
                        La idea de PAM nació del deseo de simplificar y centralizar la adopción de 
                        mascotas. Observamos que muchas fundaciones trabajaban de manera aislada, 
                        dificultando el acceso a quienes deseaban adoptar. Al juntar todo en un 
                        solo lugar, queremos hacer que el proceso sea más eficiente, transparente 
                        y accesible tanto para las organizaciones como para los adoptantes.
                    </p>
                </div>
                
                {/* Image container */}
                <div className='md:w-1/2 w-full flex justify-center sm: px-10'>
                    <img
                        src={deskImage}
                        alt='People working together'
                        className='max-w-full h-auto'
                    /> {/* Display deskImage */}
                </div>
            </section>

            {/* Third Section: Purpose and goals */}
            <section className='bg-white py-10 mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center'>
                {/* Text container for the section */}
                <div className='max-w-4xl mx-auto text-center lg:text-left md:w-1/2 w-full p-4 lg:pr-10'>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-bgGreen'>
                        Nuestra Meta
                    </h1>
                    <p className='mt-4 text-[#444444]'>
                        En PAM, creemos que cada mascota merece un hogar lleno de amor y seguridad.
                        Nuestro propósito es ofrecerles una segunda oportunidad y mejorar su calidad
                        de vida al conectarlas con familias dispuestas a brindarles el cuidado que 
                        necesitan. ¡Juntos, podemos cambiar la vida de miles de animales y darles el 
                        hogar que siempre han soñado!
                    </p>
                </div>
                
                {/* Image container */}
                <div className='md:w-1/2 w-full flex justify-center lg:justify-end pr-2'>
                    <img
                        src={imagen2}
                        alt='Dogs together'
                        className='max-w-full h-auto sm: px-10'
                    /> {/* Display imagen2 */}
                </div>
            </section>

            {/* Fourth Section: Bottom image */}
            <section>
                {/* Center the image */}
                <div className=' flex justify-center py-10 md:px-12'>
                    <img src={imagen3} alt='Bottom' /> {/* Display imagen3 */}
                </div>
            </section>
            
            {/* Include the Footer component at the bottom of the page */}
            <Footer />
        </div>
    );
}

// Export the AboutPage component to be used in other parts of the application
export default AboutPage;
