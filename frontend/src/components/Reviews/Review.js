import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BsFillStarFill} from 'react-icons/bs';
import {reviewDelete} from '../../store/reviews';

import EditModal from './EditReviewModal';
import {getSpotById} from '../../store/spots';

const Review = ({review, spotReviews, updateContainer}) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const showModal = Boolean => setModal(Boolean);

  //? Truncate review text beyond 100 characters
  const [isExpanded, setIsExpanded] = useState(false);

  const user = useSelector(state => state.session.user.user);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const max_length = 100; // Maximum number of characters to display before truncating the text

  const truncatedText =
    review.review?.length > max_length
      ? review.review.slice(0, max_length) + '...'
      : review.review;

  const handleEdit = e => {
    e.preventDefault();
    setModal(true);
  };

  const handleDelete = async e => {
    e.preventDefault();
    if (spotReviews.length === 1) {
      updateContainer(false);
    }

    await dispatch(reviewDelete(review.id));
  };

  return (
    <div>
      <div className="flex flex-row items-center ">
        <div className="h-14 w-14 mr-4">
          <img
            src={review.User?.profileImg}
            className="rounded-full object-contain text-center"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">{review.User?.name}</p>

          <div className="flex flex-row items-center">
            <p className="opacity-60 text-sm">
              {new Date(review.createdAt).toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="flex flex-row items-center ">
            <BsFillStarFill className="w-3 h-3 mr-1" />
            {review.stars}
          </div>
        </div>
      </div>
      {user.id === review.userId && (
        <div className="mt-1 ml-2 flex flex-row">
          <div
            className="cursor-pointer mr-4 hover:text-amber-600 text-blue-500 text-sm font-bold outline px-1"
            onClick={handleEdit}>
            Edit
          </div>
          <div
            className="cursor-pointer hover:text-amber-600 text-site-primary text-sm font-bold outline px-1"
            onClick={handleDelete}>
            Delete
          </div>
        </div>
      )}

      <div className="my-3">
        {isExpanded ? review.review : truncatedText}
        {review.review?.length > max_length && (
          <span
            className="text-blue-500 text-sm cursor-pointer ml-1"
            onClick={toggleExpansion}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </span>
        )}
      </div>
      {modal && <EditModal showModal={showModal} reviewObj={review} />}
    </div>
  );
};

export default Review;
