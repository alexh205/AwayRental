import React, { useEffect } from "react";
import Header from "./Header_footer/Header";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as spotActions from "../store/spots";
import { StarIcon } from "@heroicons/react/solid";
import { LocationMarkerIcon, KeyIcon } from "@heroicons/react/outline";
import { ShareAlternative } from "@styled-icons/entypo/ShareAlternative";
import { User } from "@styled-icons/entypo/User";
import { Medal2 } from "@styled-icons/remix-fill/Medal2";
import { Heart } from "@styled-icons/bootstrap/Heart";
import { DotSingle } from "@styled-icons/entypo/DotSingle";
import { Medal } from "@styled-icons/entypo/Medal";

const RentalDetail = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions.getSpotById(spotId));
    }, [dispatch, spotId]);

    let spot = useSelector(state => state.spots[spotId]);

    if (!spot)
        return (
            <>
                <Header />
                <p className="pt-2">... No Listing Found!</p>
            </>
        );
    return (
        <>
            <Header />
            <div className="flex justify-center">
                {/* Name and spot heading section */}
                {spot && (
                    <div>
                        <div className="mx-[44px] pb-[25px]">
                            <div className="text-[32px] font-medium pb-[5px]">
                                {spot.name}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex">
                                    <div className="flex ">
                                        <StarIcon className="h-5 w-5" />
                                        {spot.avgRating}
                                    </div>
                                    <div>
                                        <DotSingle className="h-4 w-3" />
                                    </div>
                                    <div
                                        className="font-medium cursor-pointer"
                                        style={{
                                            textDecoration: "underline",
                                        }}>
                                        {spot.spotReviews.length} reviews
                                    </div>
                                    <div className="pl-1">
                                        <DotSingle className="h-4 w-3" />
                                        <Medal className="h-4 w-5 pr-1" />
                                        Superhost
                                    </div>
                                    <div>
                                        <DotSingle className="h-4 w-3" />
                                    </div>
                                    <div className="px-1 font-medium cursor-pointer">
                                        <u>
                                            {spot.city}, {spot.state},{" "}
                                            {spot.country}
                                        </u>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <div className="flex justify-end cursor-pointer">
                                        <ShareAlternative className="h-6 w-6 pl-1" />
                                        <p
                                            className="pl-2"
                                            style={{
                                                textDecoration: "underline",
                                            }}>
                                            Share
                                        </p>
                                    </div>
                                    <div className="flex justify-end pl-2 cursor-pointer">
                                        <Heart className="h-6 w-6 pl-2" />
                                        <div
                                            className="pl-2"
                                            style={{
                                                textDecoration: "underline",
                                            }}>
                                            Save
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* image grouping */}
                        {spot.spotImages && spot.spotImages.length > 3 ? (
                            <div className="flex mx-[44px]">
                                <div
                                    className="flex"
                                    style={{
                                        width: "calc(80% - 90px)",
                                    }}>
                                    <img
                                        src={spot.spotImages[0].url}
                                        className="pr-[8px] rounded-tl-xl rounded-bl-xl"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    className="flex flex-col"
                                    style={{
                                        width: "calc(40% - 80px)",
                                    }}>
                                    <img
                                        src={spot.spotImages[1].url}
                                        className="pr-[4px] pb-[8px]"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                    <img
                                        src={spot.spotImages[2].url}
                                        className="pr-[4px]"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                                <div
                                    className="flex flex-col"
                                    style={{
                                        width: "calc(40% - 80px)",
                                    }}>
                                    <img
                                        src={spot.spotImages[3].url}
                                        className="pl-[4px] pb-[8px] rounded-tr-xl"
                                        style={{
                                            width: "auto",
                                            height: "100%",
                                        }}
                                    />
                                    <img
                                        src={spot.spotImages[3].url}
                                        className="pl-[4px] rounded-br-xl"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            spot.spotImages &&
                            spot.spotImages.length === 1 && (
                                <div className="flex mx-[44px] justify-center">
                                    <div
                                        className="flex"
                                        style={{
                                            width: "calc(60% - 30px)",
                                        }}>
                                        <img
                                            src={spot.spotImages[0].url}
                                            className="pr-[8px] rounded-tl-xl rounded-bl-xl"
                                        />
                                    </div>
                                </div>
                            )
                        )}
                        <div className="mx-[44px] pt-[30px] flex">
                            <div className="flex flex-col pr-[120px]">
                                {/* left side information section */}
                                <div className="flex justify-between">
                                    <div className="font-semibold text-[21px] pb-1">
                                        The {spot.type} Is Hosted by{" "}
                                        {spot.Owner.firstName}
                                    </div>
                                    <div className="pr-3">
                                        <User className="h-10 " />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div>{spot.guests} guests</div>
                                    <div>
                                        <DotSingle className="h-4 w-3" />
                                    </div>
                                    {spot.bed > 1 ? (
                                        <div>{spot.bedroom} bedrooms</div>
                                    ) : (
                                        <div>{spot.bedroom} bedroom</div>
                                    )}
                                    <div>
                                        <DotSingle className="h-4 w-3" />
                                    </div>
                                    {spot.bed > 1 ? (
                                        <div>{spot.bed} beds</div>
                                    ) : (
                                        <div>{spot.bed} bed</div>
                                    )}
                                    <div>
                                        <DotSingle className="h-4 w-3" />
                                    </div>
                                    {spot.bath > 1 ? (
                                        <div>{spot.bath} baths</div>
                                    ) : (
                                        <div>{spot.bath} bath</div>
                                    )}
                                </div>
                                <div>
                                    <div className="flex pt-[25px]">
                                        <div className="pr-[20px]">
                                            <Medal2 className="h-7" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">
                                                {spot.Owner.firstName} is a
                                                Superhost
                                            </div>
                                            <div className="text-gray-400 text-[15px]">
                                                Superhosts are experienced,
                                                highly rated hosts who are
                                                committed to providing great
                                                stays for guests.
                                            </div>
                                        </div>
                                    </div>
                                    {spot.avgRating >= 2.5 ? (
                                        <>
                                            <div className="flex pt-[25px]">
                                                <div className="pr-[20px]">
                                                    <LocationMarkerIcon className="h-7" />
                                                </div>
                                                <div>
                                                    <div>Great location</div>
                                                    <div className="text-gray-400 text-[15px]">
                                                        Recent guests gave the
                                                        location a high rating
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex pt-[25px]">
                                                <div className="pr-[20px]">
                                                    <KeyIcon
                                                        className="h-7"
                                                        style={{
                                                            transform:
                                                                "scaleX(-1)",
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <div>
                                                        Great check-in
                                                        experience
                                                    </div>
                                                    <div className="text-gray-400 text-[15px]">
                                                        Recent guests gave the
                                                        check-in process a high
                                                        rating.
                                                    </div>
                                                </div>
                                            </div>{" "}
                                        </>
                                    ) : spot.avgRating < 2.5 &&
                                      spot.avgRating >= 1 ? (
                                        <div className="flex pt-[25px]">
                                            <div className="pr-[20px]">
                                                <LocationMarkerIcon className="h-7" />
                                            </div>
                                            <div>
                                                <div>Interesting location</div>
                                                <div className="text-gray-400 text-[15px]">
                                                    Recent guests rate this
                                                    location as "interesting".{" "}
                                                    <i className="text-[11px]">
                                                        'locations rated at a
                                                        below average rating'
                                                    </i>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        spot.avgRating === 0 && (
                                            <div className="flex pt-[25px]">
                                                <div className="pr-[20px]">
                                                    <LocationMarkerIcon className="h-7" />
                                                </div>
                                                <div>
                                                    <div>New location</div>
                                                    <div className="text-gray-400 text-[15px]">
                                                        Be the first to discover
                                                        and review this new
                                                        location.
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )}
                                    <div>{/* Taco cover {first meal} */}</div>
                                    <div>{/* spot description */}</div>
                                    <div>
                                        {/* Where you'll sleep */}
                                        <div className="font-semibold text-[21px] py-[15px]">
                                            Where you'll sleep
                                        </div>
                                        <div className="flex mb-4">
                                            <div className="flex flex-col">
                                                <div className="rounded-xl"></div>
                                                <p>Bedroom</p>
                                                <p className=" py-[3px] text-[12px]">
                                                    1 queen bed
                                                </p>
                                            </div>
                                            <div className="flex flex-col">
                                                <div></div>
                                                <p>Living room</p>
                                                <p className=" py-[3px] text-[12px]">
                                                    1 sofa bed
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>{/* description */}</div>
                                <div></div>
                            </div>

                            <div>
                                {/* right side booking table */}
                                <div></div>
                            </div>
                        </div>
                        <div>{/* reviews */}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RentalDetail;
