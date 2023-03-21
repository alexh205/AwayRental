import React, {useState} from 'react';
import {differenceInCalendarDays} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {addNewBooking} from '../../store/bookings';
import {Redirect} from 'react-router-dom';

const BookingWidget = ({spot}) => {
  const dispatch = useDispatch();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [redirect, setRedirect] = useState('');

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const handleBooking = async e => {
    e.preventDefault();
    const data = {
      spotId: spot.id,
      startDate: checkIn,
      endDate: checkOut,
      guestsNum: numberOfGuests,
      name,
      phone: mobile,
      price: numberOfNights * spot.price,
    };
    const response = await dispatch(addNewBooking(data));
    setRedirect(`/account/bookings/${response}`);
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: {spot.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-t">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
            />
            <input type="date" />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={e => setNumberOfGuests(e.target.value)}
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
      <button className="primary mt-4" onClick={handleBooking}>
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * spot.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
