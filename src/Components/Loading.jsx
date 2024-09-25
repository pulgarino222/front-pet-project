import Logo from "../Assets/Logos/Logo.png"; // Import the logo image

function Loader() {
    return (
        <section>
            <figure>
                {/* Display the logo image with lazy loading */}
                <img src={Logo} alt="PAM Logo" loading="lazy" />
                {/* Caption below the logo with a motivational message */}
                <figcaption className='text-[#6B8698] mt-3 font-semibold' align='center' justify='center'>
                    ¡Más que una adopción es un propósito! {/* Message related to adoption */}
                </figcaption>
            </figure>
            {/* Version information displayed at the bottom of the loader */}
            <span className='absolute bottom-4 text-[#6B8698] text-xs'>
                Version 0.1
            </span>
        </section>
    );
}

export default Loader; // Export the Loader component
