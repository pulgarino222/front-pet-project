import Login from "../../Components/Auth/Login"; // Import the Login component
import Footer from "../../Components/Footer/Footer"; // Import the Footer component
import Header from "../../Components/Header/Header"; // Import the Header component

// Functional component for the Login page
function LoginPage() {
    return (
        <>
            <Header /> {/* Render the Header component */}
            <Login /> {/* Render the Login component */}
            <Footer /> {/* Render the Footer component */}
        </>
    );
}

export default LoginPage; // Export the LoginPage component
