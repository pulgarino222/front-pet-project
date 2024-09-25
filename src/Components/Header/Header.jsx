import Logo from "../../Assets/Logos/LogoNombre.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PetsContext from "../../Context/GlobalContext";
import jwtDecode from "jwt-decode";

function Header() {
    const navigate = useNavigate();
    const { allPets } = useContext(PetsContext);
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isMaster, setIsMaster] = useState(false); // Nuevo estado para verificar el rol

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const results = simulateSearch(query);
        setSearchResults(results);
    };

    const simulateSearch = (query) => {
        if (query === "") {
            return [];
        }

        const lowerCaseQuery = query.toLowerCase();

        return allPets.filter(
            (pet) =>
                pet.sex.toLowerCase().includes(lowerCaseQuery) ||
                pet.breed.toLowerCase().includes(lowerCaseQuery) ||
                pet.specie.toLowerCase().includes(lowerCaseQuery)
        );
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        setToken(storedToken);
        
        // Verifica si el token tiene el rol "master"
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setIsMaster(decodedToken.roles && decodedToken.roles.some(role => role.name === "master"));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsMaster(false);
        navigate("/");
    };

    return (
        <header>
            <nav className='bg-transparent relative z-20'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                    <Link to={"/"} className='flex items-center'>
                        <img src={Logo} className='w-48' alt='logo' />
                    </Link>

                    <section className='flex justify-start gap-x-4'>
                        <div className='items-center justify-between hidden w-full md:flex md:w-auto' id='navbar-search'>
                            <ul className='font-bold flex text-base flex-col p-4 md:p-0 mt-4 m border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0'>
                                <li>
                                    <Link to='/' className='block py-2 px-3 text-black rounded md:p-0 md:dark:hover:underline' aria-current='page'>
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/About-Us' className='block py-2 px-3 text-black rounded md:p-0 md:dark:hover:underline'>
                                        Nosotros
                                    </Link>
                                </li>
                                <li>
                                    <a href='/#Sponsors' className='block py-2 px-3 text-black rounded md:p-0 md:dark:hover:underline'>
                                        Patrocinadores
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className='flex md:space-x-3 relative'>
                            <button onClick={handleClick} type='button' className='md:hidden text-[#2C7B10] bg-transparent focus:outline-none rounded-lg text-sm p-2.5 me-1'>
                                {/* Icono de búsqueda */}
                            </button>

                            {/* Campo de búsqueda */}

                            {!token && (
                                <button
                                    onClick={() => navigate("/Log-In")}
                                    type='button'
                                    className='text-white bg-[#2C7B10] hidden md:block w-[240px] font-medium rounded-full text-sm px-4 py-2 text-center'>
                                    ¡Publica con nosotros!
                                </button>
                            )}

                            {token && (
                                <>
                                    <button
                                        onClick={() => navigate("/petcrud")}
                                        type='button'
                                        className='text-white bg-[#2C7B10] hidden md:block w-[150px] font-medium rounded-full text-sm px-4 py-2 text-center'>
                                        Dashboard
                                    </button>

                                    {/* Botón "User" solo si el rol es "master" */}
                                    {isMaster && (
                                        <button
                                            onClick={() => navigate("/user/delete")}
                                            type='button'
                                            className='text-white bg-[#2C7B10] hidden md:block w-[150px] font-medium rounded-full text-sm px-4 py-2 text-center'>
                                            User
                                        </button>
                                    )}

                                    <div className='relative'>
                                        <button
                                            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                                            type='button'
                                            className='text-white bg-[#2C7B10] hidden md:flex justify-between items-center w-[150px] font-medium rounded-full text-sm px-6 py-2 text-center'>
                                            Mi cuenta
                                            {/* Icono de menú */}
                                        </button>

                                        {isDropdownVisible && (
                                            <div className='absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg'>
                                                <ul className='py-1'>
                                                    <li>
                                                        <Link to={'/'} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            Mi cuenta
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={handleLogout} className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                                            Cerrar sesión
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

export default Header;





