import React from "react";
import ImageGroup from "../Images/ImageGroup";
import { useHistory } from "react-router-dom";

const SpotCard = ({ spot }) => {
  const history = useHistory();

  return (
    <div className="relative flex flex-col mx-1 my-2 border z-10 rounded-2xl hover:shadow-xl hover:scale-105 duration-200 ease-in hover:border-none hover:bg-white dark:hover:bg-site-bblue dark:border-site-midblue dark:hover:shadow-xl">
      <div className="rounded-lg overflow-hidden h-64 m-2 flex items-center justify-center">
        <ImageGroup
          images={spot.spotImages}
          spot={spot}
          onClick={() =>
            history.push(`/spots/${spot.id}`)
          }
          className="cursor-pointer"
        />
      </div>
      <div className="pl-4 mb-4 text-site-textlight dark:text-site-textdark">
        <div>
          <div className="flex flex-row items-center justify-between mx-auto pt-4">
            <div className="text-sm font-semibold">
              {spot.city}, {spot.state}
            </div>
            <div className="flex flew-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                fill="rgb(255, 194, 0)"
                className="w-4 h-4 mr-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="pr-5 text-sm">
                {spot.avgRating}
              </div>
            </div>
          </div>
          <div className="opacity-70 text-sm">
            {spot.type}
          </div>
          <div className="flex flex-row items-center mx-auto py-2 text-xs">
            <p className="px-2 py-1 font-semibold rounded-full bg-gray-800 dark:bg-site-ablue text-sm text-gray-300">
              {spot.price
                ?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .replace(".00", "")}
            </p>
            {"  "}
            <span className="pl-2 opacity-70">
              per night
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
