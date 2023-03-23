import React, {useState} from 'react';

const Review = ({review}) => {
  //? Truncate review text beyond 100 characters
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  const max_length = 100; // Maximum number of characters to display before truncating the text

  const truncatedText =
    review.review.length > max_length
      ? review.review.slice(0, max_length) + '...'
      : review.review;

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
            {review.stars}
          </div>
        </div>
      </div>
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
