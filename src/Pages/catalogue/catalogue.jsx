import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import HeroSection from "../../Components/mainHeroSection/HeroSection";
import AboutSection from "../../Components/aboutSection/AboutSection";
import ContactSection from "../../Components/contactSection/ContactSection";
import Sponsors from '../../Components/Sponsors/Sponsors';
import PetCatalog from '../../Components/catalogo/catalogue';


function Catalogue() {
    return (
        <>
            <Header />
            
            <PetCatalog/>
            
           
            <Footer />
        </>
    );
}

export default Catalogue;