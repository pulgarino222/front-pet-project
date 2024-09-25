function SponsorCard({ data }) {
    // Destructure the props to extract name, comment, and img from the data object
    const { name, comment, img } = data;

    return (
        <figure className='w-[320px] bg-white md:rounded-2xl rounded-lg overflow-hidden'>
            {/* Container for the sponsor's image */}
            <div className='w-full md:h-[200px] h-[280px] overflow-hidden'>
                <img
                    className='w-full h-full object-cover object-center' // Styles for the image
                    src={img} // Image source from the data prop
                    alt={name} // Alt text for the image
                    width={"100%"} // Set the width to 100%
                    height={"100%"} // Set the height to 100%
                />
            </div>
            {/* Container for the sponsor's comment and name */}
            <figcaption className='justify-between p-5 items-start md:h-[200px] h-[220px] flex flex-col text-[#141414]'>
                <p className='md:line-clamp-4 line-clamp-5'>{comment}</p> {/* Display the sponsor's comment with line clamping */}
                <span className='pt-2 font-bold'>
                    {name} {/* Display the sponsor's name */}
                </span>
            </figcaption>
        </figure>
    );
}

export default SponsorCard;
