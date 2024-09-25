import Register from "../../Components/Auth/Register"; // Import the Register component for user registration
import Footer from "../../Components/Footer/Footer"; // Import the Footer component
import Header from "../../Components/Header/Header"; // Import the Header component

function RegisterPager() {
    return (
        <>
            <Header /> {/* Render the Header component */}
            <Register /> {/* Render the Register component for user registration */}
            <Footer /> {/* Render the Footer component */}
        </>
    );
}

export default RegisterPager; // Export the RegisterPager component
