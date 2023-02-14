import React from "react";

import Rental from "./Rental";

const Rentals = ({ spots }) => {
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
