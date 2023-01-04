import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";

const AllSpots = ({ Images, spot }) => {
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
                    {index === current && spot.spotImages.length > 1  ? (
                        <div
                            className="relative group "
                            style={{
                                minHeight: "19vh",
                                maxHeight: "auto",
                                minWidth: "19vh",
                                maxWidth: "auto",
                            }}>
                            {/* Heart Wishlist component */}
                            <HeartIcon
                                className="opacity-70 w-6 cursor-pointer select-none"
                                style={{
                                    position: "absolute",
                                    top: "1vh",
                                    right: "2vh",
                                }}
                            />

                            {/* carousel right arrow component */}

                            <ChevronRightIcon
                                className=" rounded-full bg-gray-200 invisible group-hover:visible border-r-gray-700 text-gray-800 w-8 cursor-pointer select-none"
                                style={{
                                    position: "absolute",
                                    top: "40%",
                                    right: "1vh",
                                }}
                                onClick={nextImage}
                            />
                            {/* carousel left arrow component */}
                            <ChevronLeftIcon
                                className="rounded-full bg-gray-200 invisible group-hover:visible text-gray-800 w-8 cursor-pointer select-none"
                                style={{
                                    position: "absolute",
                                    top: "40%",
                                    left: "1vh",
                                }}
                                onClick={prevImage}
                            />

                            {/* image component */}
                            <a href={`/spots/${spot.id}`} target="_blank">
                                <img
                                    className=" rounded-xl"
                                    key={image.id}
                                    src={image.url}
                                    alt="image"
                                    style={{
                                        boxShadow:
                                            "rgb(65 65 65) 0px 1px 8px -5px",
                                    }}></img>
                            </a>
                            {/* city & state components */}
                            <div className="flex justify-between">
                                <div className="font-medium text-base ">
                                    {spot.city}, {spot.state}
                                </div>
                                {/* Rating component */}
                                <div className="flex">
                                    <StarIcon className="flex h-5 w-4" />
                                    {spot.avgRating}
                                </div>
                            </div>
                            {/* Price component */}
                            <div className="flex justify-start">
                                <div className="font-medium text-md">
                                    ${spot.price}
                                </div>
                                <p className="font-light ml-1 text-md">night</p>
                            </div>
                        </div>
                    ) : (
                        spot.spotImages.length === 1 && (
                            <div
                                className="relative group "
                                style={{
                                    minHeight: "19vh",
                                    maxHeight: "auto",
                                    minWidth: "19vh",
                                    maxWidth: "auto",
                                }}>
                                {/* Heart Wishlist component */}
                                <HeartIcon
                                    className="opacity-70 w-6 cursor-pointer select-none"
                                    style={{
                                        position: "absolute",
                                        top: "1vh",
                                        right: "2vh",
                                    }}
                                />

                                {/* image component */}
                                <a href={`/spots/${spot.id}`} target="_blank">
                                    <img
                                        className=" rounded-xl"
                                        key={image.id}
                                        src={image.url}
                                        alt="image"
                                        style={{
                                            boxShadow:
                                                "rgb(65 65 65) 0px 1px 8px -5px",
                                        }}></img>
                                </a>
                                {/* city & state components */}
                                <div className="flex justify-between">
                                    <div className="font-medium text-base ">
                                        {spot.city}, {spot.state}
                                    </div>
                                    {/* Rating component */}
                                    <div className="flex">
                                        <StarIcon className="flex h-5 w-4" />
                                        {spot.avgRating}
                                    </div>
                                </div>
                                {/* Price component */}
                                <div className="flex justify-start">
                                    <div className="font-medium text-md">
                                        ${spot.price}
                                    </div>
                                    <p className="font-light ml-1 text-md">
                                        night
                                    </p>
                                </div>
                            </div>
                        )
                    )}
                </div>
            ))}
        </section>
    );
};

export default AllSpots;
