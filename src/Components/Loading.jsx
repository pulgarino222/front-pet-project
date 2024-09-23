import Logo from "../Assets/Logos/Logo.png";

function Loader(){
    return(
        <section>
            <figure>
                <img src={Logo} alt="PAM Logo" loading="lazy" />
                <figcaption className='text-[#6B8698] mt-3 font-semibold' align='center' justify='center'>
                    ¡Más que una adopción es un propósito!
                </figcaption>
            </figure>
            <span className='absolute bottom-4 text-[#6B8698] text-xs'>
                Version 0.1
            </span>
        </section>
    );

}
export default Loader;