import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import SpotsDetail from "./SpotsDetail";

function AllSpots() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    let spots;
    const spotsList = useSelector((state) => state.spots);
    if (spotsList) spots = Object.values(spotsList);

    return (
        <div className="mt-3 grid" style={{
                "grid-auto-columns": "minmax(22rem, auto)",
                "grid-template-columns":
                    "repeat(auto-fill, minmax(22rem, 1fr))",
                "grid-column-gap": "2.8rem",
                "grid-row-gap": "2rem",}}>
            {spots &&
                spots.map((spot) => (
                    <div key={spot.id} className="w-[40-vh]">
                        {spot.spotImages && (
                            <SpotsDetail Images={spot.spotImages} spot={spot} />
                        )}
                    </div>
                ))}
        </div>
    );
}

export default AllSpots;
