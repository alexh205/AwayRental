import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {FaStar} from 'react-icons/fa';
import {MdClose} from 'react-icons/md';
import {reviewEditThunk} from '../../store/reviews';

const EditReviewModal = ({showModal, reviewObj}) => {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [valid, setValid] = useState(false);

  const [validateErrors, setValidateErrors] = useState([]);

  const validate = () => {
    const errors = [];
    if (!review) errors.push("Please provide a 'Review'");
    if (!rating) errors.push("Please provide a 'Rating'");

    return errors;
  };

  if (reviewObj) {
    if (!valid) {
      setReview(reviewObj.review);
      setRating(reviewObj.stars);
      setHover(reviewObj.stars);
      setValid(true);
    }
  }
  const onReviewEdit = async e => {
    e.preventDefault();

    const errors = validate();
    if (errors.length > 0) return setValidateErrors(errors);

    const data = {
      id: reviewObj.id,
      review,
      stars: rating,
      userId: reviewObj.userId,
      spotId: reviewObj.spotId,
    };

    await dispatch(reviewEditThunk(data));

    setReview('');
    setRating(0);
    setHover(0);
    setValidateErrors([]);
    showModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-full max-w-lg p-8 border-solid border-2  bg-white rounded-xl shadow-lg">
          <button
            className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500"
            onClick={() => showModal(false)}>
            <span className="sr-only">Close Modal</span>
            <MdClose className="w-8 h-8 text-lg mt-1 mr-1" />
          </button>
          <h2 className="mb-4 sm:text-3xl text-2xl font-bold whitespace-nowrap border-b-2 pb-2 text-center">
            Edit review
          </h2>
          <div>
            {validateErrors.length > 0 && (
              <div className="my-2 ml-2">
                <h3 className="font-bold text-[16px] ">
                  The following errors were found:
                </h3>
                <ul className="text-red-600 text-[13px] font-semibold ml-2">
                  {validateErrors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <form className="mt-6">
              <div className="flex flex-row items-center justify-between mb-3 ml-1">
                <h1 className="font-bold text-xl ">Overall Rating</h1>
                <p
                  className=" cursor-pointer text-blue-500 text-sm"
                  onClick={() => {
                    setRating(0);
                    setHover(0);
                  }}>
                  Clear
                </p>
              </div>

              <div className="border-b">
                <div className="flex flex-row mb-5">
                  {[...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                      <label key={i}>
                        <input
                          className="hidden"
                          type="radio"
                          name="rating"
                          value={ratingValue}
                          required={true}
                          onClick={() => setRating(ratingValue)}
                        />
                        <FaStar
                          size={40}
                          color={
                            ratingValue <= (hover || rating)
                              ? '#ffc107'
                              : '#e4e5e9'
                          }
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover('')}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-b flex flex-col">
                <label className="font-bold text-xl my-4">Add a review</label>
                <textarea
                  className="mb-6 mx-42 border-[2px] p-2 rounded-sm"
                  rows="6"
                  maxLength="400"
                  name="review"
                  onChange={e => setReview(e.target.value)}
                  value={review}
                  required={true}
                  placeholder="How was your stay? What did you like and dislike?"></textarea>
              </div>
              <div className="flex flex-row mt-5 justify-end ">
                <button
                  className="flex border-2 rounded-xl p-[4px] hover:shadow-xl bg-slate-500 hover:bg-slate-400 text-white font-semibold"
                  onClick={() => {
                    setReview('');
                    setRating(0);
                    setHover(0);
                    showModal(false);
                  }}>
                  Cancel
                </button>
                <button
                  className={
                    'flex ml-2 sm:ml-6 border-2 rounded-xl p-[4px] hover:shadow-xl bg-site-primary hover:bg-site-secondary text-white font-semibold'
                  }
                  onClick={onReviewEdit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
