import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../store/spots";
import Rental from "./Rental";

const Rentals = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    let spots;
    const spotsList = useSelector(state => state.spots);
    if (spotsList) spots = Object.values(spotsList);

    return (
        <div className="py-3 sm:py-5 mx-[40px]">
            <div
                className="grid "
                style={{
                    gridAutoColumns: "minmax(17rem, auto)",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(17rem, 2fr))",
                    gridColumnGap: "1.6rem",
                    gridRowGap: "2rem",
                }}>
                {spots && spots.map(spot => <Rental spot={spot} />)}
            </div>
        </div>
    );
};

export default Rentals;
