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
        <div className="mt-3 grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-2">
            {spots &&
                spots.map((spot) => (
                    <div key={spot.id} className="w-[100%]">
                        {spot.spotImages && (
                            <SpotImages Images={spot.spotImages} spot={spot} />
                        )}
                        <div className="flex justify-between px-1">
                            <div className="font-semibold text-lg">
                                {spot.city}, {spot.state}
                            </div>
                            <div className="flex pl-2">
                                <StarIcon className="flex h-5 w-4 " />
                                {spot.avgRating}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="font-semibold text-base">
                                ${spot.price}
                            </div>{" "}
                            <p className="font-light ml-1 mb-2">night</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default AllSpots;
