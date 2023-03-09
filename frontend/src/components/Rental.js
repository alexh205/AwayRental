import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import Header from './Header_footer/Header';
import ImageGroup from './ImageGroup';

const Rental = ({ spot }) => {
    if (!spot)
        return (
            <>
                <Header />
                <p className="pt-2">... No Listing Found!</p>
            </>
        );
    return (
        <div className="flex flex-col items-center justify-center  ">
            <a>

            <ImageGroup spot={spot} />
            </a>
            <div className="mt-3 flex flex-col w-full">
                <div className="flex flex-row justify-between ">
                    <p className="font-medium text-[17px]">
                        {spot.city}
                        {', '} {spot.state}
                    </p>
                    <div className="flex flex-row justify-between items-center ">
                        <BsStarFill />
                        <p className="text-[15px] ml-1">{spot.avgRating}</p>
                    </div>
                </div>
                <p className="text-[14px] -mt-1 text-gray-500">
                    Jan 28 - Aug 9
                </p>{' '}
                <div className="flex">
                    <p className="font-medium text-[16px] pr-1">
                        ${spot.price}
                    </p>
                    <p className="opacity-60"> night</p>
                </div>
            </div>
        </div>
    );
};

export default Rental;
