function SponsorCard({ data }) {
    const {name, comment, img } = data;

    return (
        <figure className='w-[320px] bg-white md:rounded-2xl rounded-lg overflow-hidden'>
        <div className='w-full md:h-[200px] h-[280px] overflow-hidden'>
            <img
                className='w-full h-full object-cover object-center'
                src={img}
                alt={name}
                width={"100%"}
                height={"100%"}
            />
        </div>
            <figcaption className='justify-between p-5 items-start md:h-[200px] h-[220px] flex flex-col text-[#141414]'>
                <p className='md:line-clamp-4 line-clamp-5'>{comment}</p>
                <span className='pt-2 font-bold'>
                    {name}
                </span>
            </figcaption>
        </figure>
    );
}

export default SponsorCard;