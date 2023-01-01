import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import AllSpots from "./AllSpots";

function SpotsHolder() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    let spots;
    const spotsList = useSelector((state) => state.spots);
    if (spotsList) spots = Object.values(spotsList);

    return (
        <div
            className="mt-3 grid"
            style={{
                gridAutoColumns: "minmax(22rem, auto)",
                gridTemplateColumns: "repeat(auto-fill, minmax(22rem, 1fr))",
                gridColumnGap: "2.8rem",
                gridRowGap: "2rem",
            }}
        >
            {spots &&
                spots.map((spot) => (
                    <div key={spot.id} className="w-[40-vh]">
                        {spot.spotImages && (
                            <AllSpots Images={spot.spotImages} spot={spot} />
                        )}
                    </div>
                ))}
        </div>
    );
}

export default SpotsHolder;
