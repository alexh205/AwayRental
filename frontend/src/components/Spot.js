import React from "react";
import { BsStarFill } from "react-icons/bs";

const Spot = ({ spot }) => {
    if (spot)
        return (
            <div className="">
                <div className="relative">
                    <div className="flex">
                        <img
                            src={spot.previewImg}
                            alt="image"
                            className="object-fit rounded-[1.3rem] sm:h-[25rem] md:h-[23rem] lg:h-[21rem] w-[100%]"
                        />
                    </div>
                </div>
                <div className="pt-3 flex justify-between items-start">
                    <div className="">
                        <p className="max-w-[27rem] font-semibold text-[17px]">
                            {spot.city} {spot.state}
                        </p>
                        <p className="max-w-[17rem]  text-[16px] -mt-1 text-gray-500">
                            Jan 28 - Aug 9
                        </p>{" "}
                        <div className="flex">
                            <p className="max-w-[17rem] font-semibold text-[17px]">
                                ${spot.price}
                            </p>
                            <p className=""> night</p>
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

export default Spot;
