import React, { useEffect } from 'react'; // Import React and useEffect hook
import AOS from 'aos'; // Import AOS (Animate on Scroll) library for scroll animations
import 'aos/dist/aos.css'; // Import AOS CSS for styling
import Footer from "../../Components/Footer/Footer"; // Import the Footer component
import Header from "../../Components/Header/Header"; // Import the Header component
import HeroSection from "../../Components/mainHeroSection/HeroSection"; // Import the HeroSection component
import AboutSection from "../../Components/aboutSection/AboutSection"; // Import the AboutSection component
import ContactSection from "../../Components/contactSection/ContactSection"; // Import the ContactSection component
import Sponsors from '../../Components/Sponsors/Sponsors'; // Import the Sponsors component
import PetCatalog from '../../Components/catalogo/catalogue'; // Import the PetCatalog component

function Catalogue() {
    return (
        <>
            <Header /> {/* Render the Header component */}
            
            <PetCatalog /> {/* Render the PetCatalog component for displaying pet listings */}
            
            <Footer /> {/* Render the Footer component */}
        </>
    );
}

export default Catalogue; // Export the Catalogue component
