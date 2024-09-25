import React, { useEffect } from 'react'; // Import React and useEffect hook
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles
import Footer from "../../Components/Footer/Footer"; // Import the Footer component
import Header from "../../Components/Header/Header"; // Import the Header component
import HeroSection from "../../Components/mainHeroSection/HeroSection"; // Import the Hero section component
import AboutSection from "../../Components/aboutSection/AboutSection"; // Import the About section component
import ContactSection from "../../Components/contactSection/ContactSection"; // Import the Contact section component
import Sponsors from '../../Components/Sponsors/Sponsors'; // Import the Sponsors section component

function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1500, // Duration of the animation in milliseconds
        });
    }, []); // Empty dependency array ensures this runs only once on component mount

    return (
        <div className='App'> {/* Main container for the Home component */}
            <Header /> {/* Render the Header component */}
            <HeroSection /> {/* Render the Hero section component */}
            <AboutSection /> {/* Render the About section component */}
            <Sponsors /> {/* Render the Sponsors section component */}
            <ContactSection /> {/* Render the Contact section component */}
            <Footer /> {/* Render the Footer component */}
        </div>
    );
}

export default Home; // Export the Home component for use in other parts of the application
