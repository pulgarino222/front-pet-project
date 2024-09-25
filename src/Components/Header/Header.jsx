import Logo from "../../Assets/Logos/LogoNombre.png"; // Importing the logo image
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate for routing
import { useContext, useEffect, useState } from "react"; // Importing React hooks
import PetsContext from "../../Context/GlobalContext"; // Importing context for pet data
import jwtDecode from "jwt-decode"; // Importing jwtDecode to decode JWT tokens

function Header() {
    const navigate = useNavigate(); // Hook for navigation
    const { allPets } = useContext(PetsContext); // Accessing all pets from context
    const [isVisible, setIsVisible] = useState(false); // State to control visibility of search
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const [searchResults, setSearchResults] = useState([]); // State for search results
    const [token, setToken] = useState(localStorage.getItem("token")); // State for JWT token
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
    const [isMaster, setIsMaster] = useState(false); // State to verify if the user is a master

    const handleClick = () => {
        setIsVisible(!isVisible); // Toggle the visibility of the search input
    };

    const handleInputChange = (event) => {
        const query = event.target.value; // Get the input value
        setSearchQuery(query); // Update search query state
        const results = simulateSearch(query); // Simulate search with the current query
        setSearchResults(results); // Update search results state
    };

    const simulateSearch = (query) => {
        if (query === "") {
            return []; // Return empty if the query is empty
        }

        const lowerCaseQuery = query.toLowerCase(); // Convert query to lowercase

        // Filter all pets based on the search query
        return allPets.filter(
            (pet) =>
                pet.sex.toLowerCase().includes(lowerCaseQuery) ||
                pet.breed.toLowerCase().includes(lowerCaseQuery) ||
                pet.specie.toLowerCase().includes(lowerCaseQuery)
        );
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token"); // Get the stored token from localStorage
        setToken(storedToken); // Update token state
        
        // Check if the token has the role "master"
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken); // Decode the token
            setIsMaster(decodedToken.roles && decodedToken.roles.some(role => role.name === "master")); // Set master state based on roles
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token from localStorage
        setToken(null); // Clear token state
        setIsMaster(false); // Reset master state
        navigate("/"); // Navigate to home page
    };

    return (
        <header>
            <nav className='bg-transparent relative z-20'> {/* Navigation bar */}
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <Link to={"/"} className='flex items-center'> {/* Logo link */}
                        <img src={Logo} className='w-48' alt='logo' /> {/* Logo image */}
                    </Link>

                    <section className='flex justify-start gap-x-4'> {/* Navigation links and search section */}
                        <div className='items-center justify-between hidden w-full md:flex md:w-auto' id='navbar-search'> {/* Navigation links for larger screens */}
                            <ul className='font-bold flex text-base flex-col p-4 md:p-0 mt-4 m border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0'>
                                <li>
                                    <Link to='/' className='block py-2 px-3 text-black rounded md:p-0 md:dark:hover:underline' aria-current='page'>
                                        Inicio {/* Home link */}
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/About-Us' className='block py-2 px-3 text-black rounded md:p-0 md:dark:hover:underline'>
                                        Nosotros {/* About Us link */}
                                    </Link>
                                </li>
                                <li>
                                    <a href='/#Sponsors' className='block py-2 px-3 text-black rounded md:p-0 md:dark:hover:underline'>
                                        Patrocinadores {/* Sponsors link */}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className='flex md:space-x-3 relative'> {/* Search and account buttons section */}
                            <button onClick={handleClick} type='button' className='md:hidden text-[#2C7B10] bg-transparent focus:outline-none rounded-lg text-sm p-2.5 me-1'>
                                {/* Search icon */}
                            </button>

                            {/* Search input field would go here */}

                            {!token && ( // If no token, show login button
                                <button
                                    onClick={() => navigate("/Log-In")}
                                    type='button'
                                    className='text-white bg-[#2C7B10] hidden md:block w-[240px] font-medium rounded-full text-sm px-4 py-2 text-center'>
                                    ¡Publica con nosotros! {/* Post with us button */}
                                </button>
                            )}

                            {token && ( // If token exists, show user account options
                                <>
                                    <button
                                        onClick={() => navigate("/petcrud")}
                                        type='button'
                                        className='text-white bg-[#2C7B10] hidden md:block w-[150px] font-medium rounded-full text-sm px-4 py-2 text-center'>
                                        Dashboard {/* Dashboard button */}
                                    </button>

                                    {/* User button only if the role is "master" */}
                                    {isMaster && (
                                        <button
                                            onClick={() => navigate("/user/delete")}
                                            type='button'
                                            className='text-white bg-[#2C7B10] hidden md:block w-[150px] font-medium rounded-full text-sm px-4 py-2 text-center'>
                                            User {/* User management button */}
                                        </button>
                                    )}

                                    <div className='relative'> {/* Dropdown for account options */}
                                        <button
                                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                                            type='button'
                                            className='text-white bg-[#2C7B10] hidden md:flex justify-between items-center w-[150px] font-medium rounded-full text-sm px-6 py-2 text-center'>
                                            Mi cuenta {/* My Account button */}
                                            {/* Menu icon */}
                                        </button>

                                        {isDropdownVisible && ( // Show dropdown menu if visible
                                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg'>
                                                <ul className='py-1'>
                                                    <li>
                                                        <Link to={'/'} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            Mi cuenta {/* My Account link */}
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={handleLogout} className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            Cerrar sesión {/* Logout button */}
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </nav>
        </header>
    );
}

export default Header; // Exporting the Header component
