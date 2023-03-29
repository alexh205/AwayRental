import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {BsFillStarFill} from 'react-icons/bs';
import {getAllReviews, reviewDelete} from '../../store/reviews';

const Review = ({review}) => {
  const dispatch = useDispatch();

  //? Truncate review text beyond 100 characters
  const [isExpanded, setIsExpanded] = useState(false);
  const [location, setLocation] = useState(review.spotId);
  const user = useSelector(state => state.session.user.user);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const max_length = 100; // Maximum number of characters to display before truncating the text

  const truncatedText =
    review.review.length > max_length
      ? review.review.slice(0, max_length) + '...'
      : review.review;

  const handleEdit = e => {
    e.preventDefault();
  };

  const handleDelete = async e => {
    e.preventDefault();

    await dispatch(reviewDelete(review.id));
    // await dispatch(getAllReviews(location));
  };

  return (
    <div>
      <div className="flex flex-row items-center ">
        <div className="h-14 w-14 mr-4">
          <img
            src={review.User.profileImg}
            className="rounded-full object-contain text-center"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold">{review.User.name}</p>

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
        <div className="mt-1 ml-2">
          <button
            className="mr-2 border-2 py-1 px-2 rounded-xl hover:shadow-xl bg-slate-500 hover:bg-slate-400 text-white text-[13px] font-semibold"
            onClick={handleEdit}>
            Edit
          </button>
          <button
            className="border-2 py-1 px-2 rounded-xl hover:shadow-xl bg-slate-500 hover:bg-slate-400 text-white text-[13px] font-semibold"
            onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}

      <div className="my-3">
        {isExpanded ? review.review : truncatedText}
        {review.review.length > max_length && (
          <span
            className="text-blue-500 text-sm cursor-pointer ml-1"
            onClick={toggleExpansion}>
            {isExpanded ? 'Read Less' : 'Read More'}
          </span>
        )}
      </div>
    </div>
  );
};

export default Review;
