import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import deskImage from "../../images/deskImage.png";
import dogs from "../../images/dogs.png";
import imagen2 from "../../images/imagen2aAP.png";
import imagen3 from "../../images/imagen3AP.png";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";  

function AboutPage(){
    useEffect(() => {
        AOS.init({
            duration:1000,
            once: false,
            mirror: true
        });
    }, []);

    return(
        <div className='font-sans'>
            <Header/>
            <section className='bg-[#f2ece1] py-24' data-aos="fade-up" >
                <div className='mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center'>
                    <div className='md:w-1/2 w-full flex justify-center' data-aos="fade-left">
                        <img src={dogs} alt='Dogs' className='max-w-full h-auto rounded-lg' />
                    </div>
                    <div className='text-left md:w-1/2 w-full p-4 lg:pl-0 md:pl-5  max-w-xl sm:max-w-2xl pl-5 md:max-w-full' data-aos="fade-right">
                        <h1 className='text-5xl md:text-6xl font-bold leading-tight md:leading-tight mb-6 text-[#6B8698]'>
                        ¿Quiénes Somos?
                        </h1>
                        <p className='my-4 md:text-lg text-[#6B8698]' data-aos="fade-up" data-aos-delay="200">
                        Somos PAM (Pet Adoption Manager), una plataforma dedicada a centralizar la 
                        adopción de mascotas, conectando a las fundaciones con personas que buscan 
                        dar una nueva oportunidad a animales rescatados. Nuestra misión es facilitar 
                        el proceso de adopción, creando un espacio donde las organizaciones puedan 
                        registrar y publicar a sus mascotas disponibles, y los usuarios puedan encontrar
                        fácilmente a su futuro compañero de vida.                         
                        </p>
                    </div>
                </div>
            </section>

            <section className='bg-[#D8A373] py-10' data-aos="fade-up"  >
                <div className='mx-auto max-w-screen-xl flex flex-col lg:flex-row-reverse items-center'>
                    <div className='md:w-1/2 w-full flex justify-center sm: px-10' data-aos="fade-right" >
                        <img src={deskImage} alt='People working together' className='max-w-full h-auto rounded-lg' />
                    </div>
                    <div className='text-left md:w-1/2 w-full px-20 lg:pr-20 md:pr-10 pr-0 max-w-xl sm:max-w-2xl md:max-w-3xl' data-aos="fade-left">
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-white'>
                        ¿De Dónde Surgió la Idea?
                        </h1>
                        <p className='my-4 md:text-lg text-white' data-aos="fade-up" data-aos-delay="200">
                        La idea de PAM nació del deseo de simplificar y centralizar la adopción de 
                        mascotas. Observamos que muchas fundaciones trabajaban de manera aislada, 
                        dificultando el acceso a quienes deseaban adoptar. Al juntar todo en un 
                        solo lugar, queremos hacer que el proceso sea más eficiente, transparente 
                        y accesible tanto para las organizaciones como para los adoptantes.                            
                        </p>
                    </div>
                </div>
            </section>

            <section className='bg-[#f2ece1] py-10' data-aos="fade-up">
                <div className='mx-auto max-w-screen-xl flex flex-col lg:flex-row items-center'>
                    <div className='md:w-1/2 w-full flex justify-center lg:justify-end pr-2' data-aos="fade-left">
                        <img src={imagen2} alt='Dogs together' className='max-w-full h-auto rounded-lg sm: px-10' />
                    </div>
                    <div className='max-w-4xl mx-auto text-center lg:text-left md:w-1/2 w-full p-4 lg:pr-10' data-aos="fade-right" >
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-bgGreen'>
                        Nuestro Propósito
                        </h1>
                        <p className='mt-4 text-[#6B8698]' data-aos="fade-up" data-aos-delay="200"> 
                        En PAM, creemos que cada mascota merece un hogar lleno de amor y seguridad.
                        Nuestro propósito es ofrecerles una segunda oportunidad y mejorar su calidad
                        de vida al conectarlas con familias dispuestas a brindarles el cuidado que 
                        necesitan. ¡Juntos, podemos cambiar la vida de miles de animales y darles el 
                        hogar que siempre han soñado!                           
                        </p>
                    </div>
                </div>
            </section>

            <section className='bg-[#D8A373] py-10' data-aos="fade-up">
                <div className='flex justify-center md:px-12' data-aos="zoom-in">
                    <img src={imagen3} alt='Bottom' className='max-w-full h-auto rounded-lg' />
                </div>
            </section>
            <Footer/>
        </div>
    );
}

export default AboutPage;