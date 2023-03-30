import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {FaStar} from 'react-icons/fa';
import {addNewReview} from '../../store/reviews';


const CreateReview = ({spot}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [validateErrors, setValidateErrors] = useState([]);

  const user = useSelector(state => state.session.user.user);

  const validate = () => {
    const errors = [];
    if (!review) errors.push("Please provide a 'Review'");
    if (!rating) errors.push("Please provide a 'Rating'");

    return errors;
  };

  const onReviewCreation = async e => {
    e.preventDefault();

    const errors = validate();
    if (errors.length > 0) return setValidateErrors(errors);

    const data = {
      review,
      stars: rating,
      userId: user.id,
      spotId: spot.id,
    };

    await dispatch(addNewReview(data));


    setReview('');
    setRating(0);
    setHover(0);
    setValidateErrors([]);
    history.push(`/spots/${spot.id}`);
  };

  return (
    <>
      <div className="inline-flex flex-col lg:flex  mx-5 md:mx-40 mb-7">
        <div className="flex flex-col">
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
        </div>
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
                        ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'
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
              className="border-2 rounded-xl p-[4px] shadow-xl hover:shadow-xl bg-slate-500 hover:bg-slate-400 text-white font-semibold"
              onClick={() => {
                setReview('');
                setRating(0);
                setHover(0);
                history.push('/account/bookings');
              }}>
              Cancel
            </button>

            <button
              className={
                'flex ml-2 sm:ml-6 border-2 rounded-xl p-[4px] hover:shadow-xl bg-site-primary hover:bg-site-secondary text-white font-semibold'
              }
              onClick={e => {
                onReviewCreation(e);
              }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateReview;
