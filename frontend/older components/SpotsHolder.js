import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../src/store/spots";
import AllSpots from "./AllSpots";

function SpotsHolder() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    let spots;
    const spotsList = useSelector(state => state.spots);
    if (spotsList) spots = Object.values(spotsList);

    return (
        <div
            className="my-4 grid"
            style={{
                gridAutoColumns: "minmax(19rem, auto)",
                gridTemplateColumns: "repeat(auto-fill, minmax(19rem, 2fr))",
                gridColumnGap: "1.5rem",
                gridRowGap: "2rem",
            }}>
            {spots &&
                spots.map(spot => (
                    <div key={spot.id}>
                        {spot.spotImages && (
                            <AllSpots Images={spot.spotImages} spot={spot} />
                        )}
                    </div>
                ))}
        </div>
    );
}

export default SpotsHolder;
