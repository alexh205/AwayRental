import React from 'react';
import ImageGroup from '../Images/ImageGroup';
import {useHistory} from 'react-router-dom';

const SpotCard = ({spot}) => {
  const history = useHistory();

  return (
    <div className="relative flex flex-col my-2 mx-3 bg-white z-10  border-2 rounded-2xl hover:shadow-xl">
      <div>
        <ImageGroup
          images={spot.spotImages}
          spot={spot}
          onClick={() => history.push(`/spots/${spot.id}`)}
          className="cursor-pointer"
        />
      </div>
      <div>
        <div className="flex flex-row items-center justify-between px-2 mx-auto">
          <div>
            {spot.city}, {spot.state}
          </div>
          <div
            className={`${
              spot.avgRating < 1 ? 'hidden' : 'flex flew-row items-center'
            }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1">
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {spot.avgRating}
          </div>
        </div>

        <div className="flex flex-row items-center px-2 mx-auto mb-2">
          <p className="font-bold mr-1">
            {spot.price
              ?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
              .replace('.00', '')}
          </p>{' '}
          night
        </div>
      </div>
    </div>
  );
};

export default SpotCard;
