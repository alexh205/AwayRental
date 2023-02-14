import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { FaHeart } from "react-icons/fa";

const ImageGroup = ({ spot }) => {
    const [current, setCurrent] = useState(0);
    const Images = spot.spotImages;
    const length = Images.length;

    const nextImage = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };
    const prevImage = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(Images) || Images.length <= 0) {
        return null;
    }
    return (
        <>
            {spot.spotImages.map((image, index) => {
                return (
                    <div>
                        {index === current && spot.spotImages.length > 1 ? (
                            <div className="relative group">
                                <a href={`/spots/${spot.id}`} target="_blank" rel="noreferrer">
                                    <img
                                        src={image.url}
                                        alt='spot'
                                        className="object-fit rounded-[1.3rem] sm:h-[22rem] md:h-[19rem] lg:h-[18rem] w-[100%] "
                                        style={{
                                            boxShadow:
                                                "rgb(65 65 65) 0px 1px 8px -5px",
                                        }}
                                    />
                                </a>
                                <FaHeart className="absolute text-[22px] top-[1vh] right-[1.8vh] opacity-50" />
                                <ChevronLeftIcon
                                    className="absolute top-[45%] left-[7px] h-[4rem] rounded-full bg-gray-200 invisible group-hover:visible border-r-gray-700 opacity-70 text-gray-800 w-8 cursor-pointer select-none"
                                    onClick={prevImage}
                                />
                                <ChevronRightIcon
                                    className="absolute top-[45%] right-[7px] h-[4rem] rounded-full bg-gray-200 invisible group-hover:visible border-r-gray-700 opacity-70 text-gray-800 w-8 cursor-pointer select-none"
                                    onClick={nextImage}
                                />
                            </div>
                        ) : (
                            spot.spotImages.length === 1 && (
                                <div className="relative group">
                                    <a
                                        href={`/spots/${spot.id}`}
                                        target="_blank" rel="noreferrer">
                                        <img
                                            src={image.url}
                                            alt='spot'
                                            className="object-fit rounded-[1.3rem] sm:h-[25rem] md:h-[23rem] lg:h-[21rem] w-[100%]"
                                            style={{
                                                boxShadow:
                                                    "rgb(65 65 65) 0px 1px 8px -5px",
                                            }}
                                        />
                                    </a>
                                    <FaHeart className="absolute text-[22px] top-[1vh] right-[1.8vh]  opacity-50" />
                                </div>
                            )
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default ImageGroup;
