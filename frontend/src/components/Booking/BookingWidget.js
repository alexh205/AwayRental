import React, { useState } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBookingThunk } from '../../store/bookings';
import { Redirect } from 'react-router-dom';
import { BsDot, BsFillStarFill } from 'react-icons/bs';

const BookingWidget = ({ spot, user }) => {
  const dispatch = useDispatch();
  const searchData = useSelector(state => state.spots.search)
  const startDate = searchData.startDate ? format(new Date(searchData.startDate), "yyy-MM-dd") : '';
  const endDate = searchData.endDate ? format(new Date(searchData.endDate), "yyy-MM-dd") : '';

  const [checkIn, setCheckIn] = useState(startDate);
  const [checkOut, setCheckOut] = useState(endDate);
  const [numberOfGuests, setNumberOfGuests] = useState(searchData.guestsNum || 1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const [validateErrors, setValidateErrors] = useState([]);

  const reviewState = useSelector(state => state.reviews);

  const numReviews = Object.values(reviewState).length;
  let ratingTotal = 0;

  Object.values(reviewState).forEach(review => {
    if (review.stars) ratingTotal += review.stars;
  });

  let avgRating;

  ratingTotal > 0
    ? (avgRating = Math.round((ratingTotal / numReviews) * 100) / 100)
    : (avgRating = 0);

  const reviewAvgRating = avgRating;

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const validate = () => {
    const errors = [];

    if (!checkIn) errors.push("Please provide a 'Start Date'");
    if (!checkOut) errors.push("Please provide a 'End Date'");
    if (!name) errors.push("Please select a 'Name'");
    if (!mobile) errors.push("Please provide a 'Phone Number'");

    return errors;
  };

  const handleBooking = async e => {
    e.preventDefault();

    if (!user) {
      alert('You must login to book this property!');
      return;
    }
    const errors = validate();

    if (errors.length > 0) {
      return setValidateErrors(errors);
    }

    if (user.id === spot.ownerId) {
      alert('You can not book a property you already own!');
      return;
    }

    const data = {
      spotId: spot.id,
      startDate: new Date(checkIn),
      endDate: new Date(checkOut),
      guestsNum: Number(numberOfGuests),
      name,
      price: numberOfNights * spot.price,
      phone: mobile,
    };
    setCheckIn('');
    setCheckOut('');
    setNumberOfGuests(1);
    setName('');
    setMobile('');
    setValidateErrors([]);

    const response = await dispatch(addNewBookingThunk(data));
    setRedirect(`/account/bookings/${response}`);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="bg-white shadow-xl p-4 rounded-2xl border-[1px]">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <div className="text-xl text-center flex flex-row items-center my-1">
          {spot.price
            ?.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })
            .replace('.00', '')}
          <p className="text-base ml-1 text-gray-500 mr-1">night</p>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center text-base">
            <BsFillStarFill className="w-4 h-4 mr-1" />
            {reviewAvgRating}
          </div>
          <BsDot className="mx-1" />
          {Object.values(reviewState).length > 0 ? (
            <div className="font-medium underline flex flex-row items-center text-base text-gray-500 ">
              {Object.values(reviewState).length}
              <p className="text-base text-gray-500 ml-1">reviews</p>
            </div>
          ) : (
            <div className="font-medium underline text-base text-gray-500">
              0 reviews
            </div>
          )}
        </div>
      </div>
      <div className="border rounded-2xl mt-4">
        {validateErrors.length > 0 && (
          <div className="my-2 ml-2">
            <ul className="text-red-600 text-[13px] font-semibold ml-2">
              {validateErrors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex xl:flex-row flex-col items-center">
          <div className="py-3 px-4">
            <label className="text-base mr-2 font-semibold">Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              className="text-sm"
            />
          </div>
          <div className="py-3 px-4 xl:border-t">
            <label className="text-base mr-2 font-semibold">Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              className="text-sm"
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="text-base font-semibold">Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={e => setNumberOfGuests(e.target.value)}
            className="text-sm text-center"
          />
        </div>

        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label className="text-base font-semibold">Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label className="text-base font-semibold">Phone number: <small>(Format: 123-456-7890)</small></label>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        className="primary mt-4 whitespace-nowrap bg-site-primary hover:bg-site-secondary"
        onClick={handleBooking}>
        Book this property
        {numberOfNights > 0 && (
          <span className="ml-[2px]">
            {(numberOfNights * spot.price)
              ?.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
              .replace('.00', '')}
          </span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
