import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { StarIcon } from "@heroicons/react/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import SpotImages from "./SpotImages";

function AllSpots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    let spots;
    const spotsList = useSelector((state) => state.spots);
    if (spotsList) spots = Object.values(spotsList);

    return (
        // Todo implement custom screen size control
        <div className="mt-3 grid 3xl:grid-cols-6 2xl:grid-cols-5  xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1  gap-x-5 gap-y-3">
            {spots &&
                spots.map((spot) => (
                    <div key={spot.id} className="w-[100%]">
                        {spot.spotImages && (
                            <SpotImages Images={spot.spotImages} spot={spot} />
                        )}
                        <div className="flex justify-between px-1">
                            <div className="font-medium text-base">
                                {spot.city}, {spot.state}
                            </div>
                            <div className="flex pl-2 ">
                                <StarIcon className="flex h-5 w-4" />
                                {spot.avgRating}
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="font-medium text-md ml-1">
                                ${spot.price}
                            </div>
                            <p className="font-light ml-1 mb-2 text-md">night</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default AllSpots;
