import React from "react";
import { BsStarFill } from "react-icons/bs";
import Header from "./Header_footer/Header";
import ImageGroup from "./ImageGroup";

const Rental = ({ spot }) => {
    if (!spot)
        return (
            <>
                <Header />
                <p className="pt-2">... No Listing Found!</p>
            </>
        );
    return (
        <div className="">
            <div className="relative">
                <div className="flex">
                    <ImageGroup spot={spot} />
                </div>
            </div>
            <div className="pt-3 flex justify-between items-start">
                <div className="">
                    <p className="max-w-[27rem] font-medium text-[17px]">
                        {spot.city}{", "} {spot.state}
                    </p>
                    <p className="max-w-[17rem]  text-[16px] -mt-1 text-gray-500">
                        Jan 28 - Aug 9
                    </p>{" "}
                    <div className="flex">
                        <p className="max-w-[17rem] font-medium text-[17px] pr-1">
                            ${spot.price}
                        </p>
                        <p className="opacity-60"> night</p>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <BsStarFill />
                    <p className="text-[15px]">{spot.avgRating}</p>
                </div>
            </div>
        </div>
    );
};

export default Rental;
