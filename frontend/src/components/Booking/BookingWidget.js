import React, {useState} from 'react';
import {differenceInCalendarDays} from 'date-fns';
import {useDispatch} from 'react-redux';
import {addNewBooking} from '../../store/bookings';
import {Redirect} from 'react-router-dom';
import {BsDot} from 'react-icons/bs';

const BookingWidget = ({spot, user}) => {
  const dispatch = useDispatch();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');
  const [validateErrors, setValidateErrors] = useState([]);

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

    const response = await dispatch(addNewBooking(data));
    setRedirect(`/account/bookings/${response}`);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="bg-white shadow-xl p-4 rounded-2xl border-[1px]">
      <div className="flex lg:flex-row flex-col items-center justify-between">
        <div className="text-xl text-center flex flex-row items-center my-1">
          ${spot.price}
          <p className="text-base ml-1 text-gray-500 mr-1">night</p>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 mr-1 ">
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {spot.avgRating}
          </div>
          <BsDot className="mx-1" />
          {spot.numReviews > 0 ? (
            <div className="font-medium underline flex flex-row items-center text-base text-gray-500 ">
              {spot.numReviews}
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
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>
      <button
        className="primary mt-4 whitespace-nowrap"
        onClick={handleBooking}>
        Book this property
        {numberOfNights > 0 && (
          <span>
            ${numberOfNights * spot.price} ({numberOfNights} nights)
          </span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
