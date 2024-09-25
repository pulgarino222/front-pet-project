import Footer from "../../Components/Footer/Footer"; // Import the Footer component
import AccountForm from "../../Components/Auth/AccountForm"; // Import the AccountForm component for managing user accounts
import Header from "../../Components/Header/Header"; // Import the Header component
// import { useParams } from "react-router-dom"; // Import useParams for accessing route parameters (currently commented out)

function MyAccount() {
    // const { userId } = useParams(); // Uncomment to get the userId from URL parameters

    // console.log(userId); // Log the userId for debugging (currently commented out)

    return (
        <section className='bg-[#F4F4F4]'> {/* Section with a light gray background */}
            <Header /> {/* Render the Header component */}
            <AccountForm /> {/* Render the AccountForm component for user account management */}
            <Footer /> {/* Render the Footer component */}
        </section>
    );
}

export default MyAccount; // Export the MyAccount component
