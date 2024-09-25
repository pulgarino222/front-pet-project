import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation

function ComingSoon() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-[#ABC2A3] to-[#8FA88F]'>
            {/* Center the content vertically and horizontally with a gradient background */}
            <div className='text-center p-10 bg-white rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105'>
                {/* White card with padding, rounded corners, and shadow effect */}
                <h1 className='text-5xl font-extrabold text-[#5F7A61] mb-6'>
                    Próximamente {/* Main heading for the Coming Soon section */}
                </h1>
                <p className='text-lg text-gray-700 mb-8'>
                    Estamos trabajando duro para traerte esta sección. ¡Vuelve
                    pronto! {/* Message indicating the section is under construction */}
                </p>
                <div className='flex justify-center mb-8'>
                    <img
                        src='https://images.dog.ceo/breeds/pitbull/dog-3981540_1280.jpg' // Image URL for visual appeal
                        alt='Mascotas' // Alt text for accessibility
                        className='rounded-full w-28 h-28 object-cover border-4 border-[#5F7A61]' // Style the image as a circular shape with border
                        loading='lazy' // Enable lazy loading for the image
                    />
                </div>
                <Link to='/'> {/* Link to redirect to the home page */}
                    <button className='bg-[#5F7A61] text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-[#4e6651] transition-colors duration-300'>
                        Volver al Inicio {/* Button to return to the home page */}
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default ComingSoon; // Export the ComingSoon component
