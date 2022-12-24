import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";

const SpotImages = ({ Images, spot }) => {
    const [current, setCurrent] = useState(0);
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
        <section className="flex justify-center items-center ">
            {spot.spotImages.map((image, index) => (
                <div key={index}>
                    {index === current && (
                        <div className="relative group ">
                            <HeartIcon className=" absolute opacity-70 w-6 ml-[87%] mt-[4%]  cursor-pointer select-none" />
                            <ChevronRightIcon
                                className="absolute rounded-full bg-gray-200 mt-[30%] ml-[85%] invisible group-hover:visible border-r-gray-700 text-gray-800 w-8 cursor-pointer select-none"
                                onClick={nextImage}
                            />

                            <ChevronLeftIcon
                                className="absolute rounded-full bg-gray-200 mt-[30%] ml-[4%]  invisible group-hover:visible text-gray-800 w-8 cursor-pointer select-none"
                                onClick={prevImage}
                            />

                            <a href={image.url} target="_blank" className="">
                                <img
                                    className="block rounded-lg h-auto  w-auto"
                                    key={image.id}
                                    src={image.url}
                                    alt="image"
                                ></img>
                            </a>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default SpotImages;
