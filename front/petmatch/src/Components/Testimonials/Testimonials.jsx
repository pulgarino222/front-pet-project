import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
    const [testimonials, setTestimonials] = useState(undefined);

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} bg-[#416a32] hover:bg-[#5b9248] w-[45px] h-[45px] text-white font-bold py-2 px-4 rounded-full`}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} bg-[#416a32] hover:bg-[#5b9248] w-[45px] h-[45px] text-white font-bold py-2 px-4 rounded-full`}
                style={{ ...style, display: "block" }}
                onClick={onClick}
            />
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <section
            id='Testimonials'
            className='bg-[#D1E0CB] lg:py-28 md:py-20 py-16 overflow-hidden'>
            <h3 className='text-[#6B8698] lg:text-5xl text-3xl text-center font-bold md:pb-16 pb-10'>
                Sponsors
            </h3>
            <section
                className='mx-auto max-w-screen-xl rounded-2xl px-8 relative'
                data-aos='zoom-out-up'>
                <Slider {...settings}>
                    {testimonials !== undefined &&
                        testimonials.map((test, index) => (
                            <div
                                key={index}
                                data-aos='fade-up'
                                data-aos-delay={index * 100}>
                                <TestimonialCard
                                    key={index}
                                    data={test}
                                />
                            </div>
                        ))}
                </Slider>
            </section>
        </section>
    );
}

export default Testimonials;