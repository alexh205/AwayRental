import React, { useEffect } from "react";
import Header from "./Header_footer/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as spotActions from "../store/spots";
import { StarIcon } from "@heroicons/react/solid";
import { ShareAlternative } from "@styled-icons/entypo/ShareAlternative";
import { Heart } from "@styled-icons/bootstrap/Heart";
import { DotSingle } from "@styled-icons/entypo/DotSingle";
import { Medal } from "@styled-icons/entypo/Medal";

const SpotDetail = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.getSpotById(spotId));
    }, [dispatch, spotId]);

    let spot = useSelector((state) => state.spots[spotId]);

    if (!spot)
        return (
            <>
                <Header />
                <p className="pt-2">... No Listing Found!</p>
            </>
        );
    console.log(spot);

    return (
        <>
            <Header />
            <div className="pt-4 flex justify-center">
                {spot && (
                    <div>
                        <div className="px-[80px]">
                            <div className="text-[30px] font-medium">
                                {spot.name}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex">
                                    <div className="flex">
                                        <StarIcon className="h-5 w-5" />
                                        {spot.avgRating}
                                    </div>
                                    <div
                                        className="font-medium"
                                        style={{
                                            textDecoration: "underline",
                                        }}
                                    >
                                        <DotSingle className="h-4 w-3" />
                                        {spot.spotReviews.length} reviews
                                    </div>
                                    <div className="pl-1">
                                        <DotSingle className="h-4 w-3" />
                                        <Medal className="h-4 w-5 pr-1" />
                                        Superhost
                                    </div>
                                    <div className="px-1 font-medium">
                                        <DotSingle className="h-4 w-3" />
                                        <u>
                                            {spot.city}, {spot.state},{" "}
                                            {spot.country}
                                        </u>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="flex">
                                        <ShareAlternative className="h-6 w-6 pl-1" />
                                        <p
                                            className="pl-1"
                                            style={{
                                                textDecoration: "underline",
                                            }}
                                        >
                                            Share
                                        </p>
                                    </div>
                                    <div className="flex justify-end pl-2">
                                        <Heart className="h-6 w-6 pl-2" />
                                        <div
                                            className="pl-2"
                                            style={{
                                                textDecoration: "underline",
                                            }}
                                        >
                                            Save
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {spot.spotImages && (
                            <div
                                className="px-[80px] pt-[24px]"
                                style={{ maxWidth: "1120px" }}
                            >
                                <div
                                    className="inline-block"
                                    style={{
                                        verticalAlign: "bottom",
                                        height: "100%",
                                        width: "100%",
                                        minHeight: "1px",
                                    }}
                                >
                                    <img src={spot.spotImages[0].url} />
                                </div>
                                <div>
                                    <div className="inline-block ">
                                        <img src={spot.spotImages[1].url} />
                                    </div>
                                    <div className="inline-block ">
                                        {" "}
                                        <img src={spot.spotImages[2].url} />
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="inline-block "
                                        style={{
                                            verticalAlign: "bottom",
                                            height: "100%",
                                            width: "100%",
                                            minHeight: "1px",
                                        }}
                                    >
                                        {" "}
                                        <img src={spot.spotImages[3].url} />
                                    </div>
                                    {/* <div className="inline-block "> <img src={spot.spotImages[4].url} /></div> */}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default SpotDetail;
