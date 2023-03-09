import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useHistory } from 'react-router-dom';

const ImageGroup = ({ spot }) => {
    const imagesObj = Object.values(spot.spotImages);
    const history = useHistory();

    const handleClick = () => {
        history.push(`/spots/${spot.id}`);
    };

    const handleHeartClick = () => {};

    return (
        <div className="relative h-56 ">
            <Carousel
                className="h-full flex "
                infiniteLoop
                showStatus={false}
                showIndicators={true}
                showThumbs={false}>
                {imagesObj.map(image => (
                    <div key={image.id} className="h-full  relative">
                        <FaHeart
                            className="absolute top-2 right-2 sm:top-[10px] sm:right-[34px] z-40 cursor-pointer opacity-90 text-slate-600 hover:text-red-600 hover:opacity-100"
                            onClick={handleHeartClick}
                        />

                        <div className="cursor-pointer" onClick={handleClick}>
                            <img
                                loading="lazy"
                                src={image.url}
                                alt="carousel image"
                                className="object-contain object-center rounded-xl"
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ImageGroup;
