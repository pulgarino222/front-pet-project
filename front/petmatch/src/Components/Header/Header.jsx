
import LogoNombre from "../../Assets/Logos/LogoNombre.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PetsContext from "../../Context/GlobalContext";

function Header() {
    const navigate = useNavigate();

    const { userID } = useContext(PetsContext);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    // Carga el Token siempre que el componente se monte
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    // Simular el log out
    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };

    return (
        <header>
            <nav className='bg-transparent relative z-20'>
                <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2'>
                    <Link to={"/"} className='flex items-center'>
                        <img src={LogoNombre} className='w-52' alt='logo' />
                    </Link>

                    <section className='flex justify-start gap-x-3'>
                        <div
                            className='items-center justify-between hidden w-full md:flex md:w-auto'
                            id='navbar-search'>
                            <ul className='font-bold flex text-base flex-col p-2 md:p-0 mt-2 m border rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0'>
                                <li>
                                    <Link
                                        to='/'
                                        className='hover:underline py-1 px-2 text-black rounded md:p-0 md:dark'
                                        aria-current='page'>
                                        Inicio
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        type='button'
                                        to='/Catalogue'
                                        className='text-white bg-bgGreen hidden md:block w-[160px] font-medium rounded-lg text-sm px-3 py-1.5 text-center hover:bg-[#89ac76]'>
                                        ¡Adoptar ahora!
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to='/About-Us'
                                        className='block py-1 px-2 text-black rounded md:p-0 md:dark:hover:underline'>
                                        ¿Quienes somos?
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href='/#Sponsors'
                                        className='block py-1 px-2 text-black rounded md:p-0 md:dark:hover:underline'>
                                        Sponsors
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='flex md:space-x-2 relative'>
                            <div className='relative hidden md:block'>
                                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                                </div>
                            </div>
                            {!token && (
                                <button
                                    onClick={() =>
                                        navigate(!token ? "/Log-In" : "/Match")
                                    }
                                    type='button'
                                    className='text-white bg-bgGreen hidden md:block w-[140px] font-medium rounded-lg text-sm px-3 py-1.5 text-center hover:bg-[#89ac76]'>
                                    Para fundaciones
                                </button>
                            )}

                            {token && (
                                <div className='relative'>
                                    <button
                                        onClick={() =>
                                            setIsDropdownVisible(
                                                !isDropdownVisible
                                            )
                                        }
                                        type='button'
                                        className='text-white bg-[#6B8698] hidden md:flex justify-between items-center w-[140px] font-medium rounded-full text-sm px-4 py-1.5 text-center'>
                                        Mi cuenta
                                        <span>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M11.1808 15.8297L6.54199 9.20285C5.89247 8.27496 6.55629 7 7.68892 7L16.3111 7C17.4437 7 18.1075 8.27496 17.458 9.20285L12.8192 15.8297C12.4211 16.3984 11.5789 16.3984 11.1808 15.8297Z'
                                                    fill='#fff'
                                                />
                                            </svg>
                                        </span>
                                    </button>

                                    {isDropdownVisible && (
                                        <div className='absolute right-0 mt-1 w-44 bg-white border rounded-lg shadow-lg'>
                                            <ul className='py-1'>
                                                <li>
                                                    <Link
                                                        to={`/Account-Settings/${userID}`}
                                                        className='block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100'>
                                                        Mi cuenta
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to='/Matches'
                                                        className='block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100'>
                                                        Matches
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className='w-full text-left block px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100'>
                                                        Cerrar sesión
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </nav>
        </header>
    );
}

export default Header;
