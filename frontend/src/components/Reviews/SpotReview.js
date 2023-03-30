import React, {useEffect, useState} from 'react';
import {BsDot} from 'react-icons/bs';
import {useDispatch, useSelector} from 'react-redux';
import Review from './Review';
import {getAllReviews} from '../../store/reviews';

const SpotReview = ({spot}) => {
  const dispatch = useDispatch();
  const [container, setContainer] = useState(true);

  const updateContainer = Boolean => setContainer(Boolean);

  useEffect(() => {
    dispatch(getAllReviews(spot.id));
  }, [spot, dispatch]);

  const reviewObjs = useSelector(state => state.reviews);

  return (
    <>
      {spot && container && (
        <div className="mb-7 mt-4">
          <h2 className="text-2xl font-semibold mb-1">User reviews</h2>
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center text-[22px] ">
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
            <BsDot className="mx-[2px]" />
            {spot.numReviews > 0 ? (
              <div className="font-medium flex flex-row items-center text-[22px]">
                {spot.numReviews}
                <p className=" ml-1 ">reviews</p>
              </div>
            ) : (
              <div className="font-medium flex flex-row items-center text-[22px]">
                0 reviews
              </div>
            )}
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
            {Object.values(reviewObjs).map((review, ind) => (
              <div key={ind} className="my-8">
                <Review
                  review={review}
                  spotReviews={Object.values(reviewObjs)}
                  updateContainer={updateContainer}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SpotReview;
