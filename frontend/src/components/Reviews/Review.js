import React, { useState } from "react";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { BsFillStarFill } from "react-icons/bs";
import { reviewDeleteThunk } from "../../store/reviews";
import EditModal from "../Modals/EditReviewModal";

const Review = ({
  review,
  spotReviews,
  updateContainer,
}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const showModal = (Boolean) =>
    setModal(Boolean);

  //? Truncate review text beyond 100 characters
  const [isExpanded, setIsExpanded] =
    useState(false);

  const user = useSelector(
    (state) => state.session.user?.user
  );

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const max_length = 100; // Maximum number of characters to display before truncating the text

  const truncatedText =
    review.review?.length > max_length
      ? review.review.slice(0, max_length) + "..."
      : review.review;

  const handleEdit = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (spotReviews.length === 1) {
      updateContainer(false);
    }

    await dispatch(reviewDeleteThunk(review.id));
  };

  return (
    <div>
      <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-300 bg-white text-gray-800 hover:shadow-md">
        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            <div>
              <img
                src={review.User?.profileImg}
                alt="profile"
                className="object-cover w-12 h-12 rounded-full bg-gray-500"
              />
            </div>
            <div>
              <h4 className="font-bold">
                {review.User?.name}
              </h4>
              <span className="text-xs text-gray-600">
                {new Date(
                  review.createdAt
                ).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-yellow-500 bg-[#fafafa] shadow-md px-5 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4 h-4 fill-current"
            >
              <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z"></path>
            </svg>
            <span className="text-sm font-bold">
              {review.stars}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-2 text-sm text-gray-600">
          {/* Test */}
          {user?.id === review.userId && (
            <div className="my-2 ml-2 flex flex-row">
              <div
                className="cursor-pointer mr-4 hover:text-amber-600 text-blue-500 text-sm font-bold outline px-1"
                onClick={handleEdit}
              >
                Edit
              </div>
              <div
                className="cursor-pointer hover:text-amber-600 text-site-primary text-sm font-bold outline px-1"
                onClick={handleDelete}
              >
                Delete
              </div>
            </div>
          )}

          <div className="my-3">
            {isExpanded
              ? review.review
              : truncatedText}
            {review.review?.length >
              max_length && (
              <span
                className="text-blue-500 text-sm cursor-pointer ml-1"
                onClick={toggleExpansion}
              >
                {isExpanded
                  ? "Read Less"
                  : "Read More"}
              </span>
            )}
          </div>
          {modal && (
            <EditModal
              showModal={showModal}
              reviewObj={review}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
