import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header_footer/Header';
import {getSingleBookingThunk} from '../../store/bookings';
import {useDispatch} from 'react-redux';
import LocationLink from '../Spots/LocationLink';
import BookingDates from './BookingDates';
import {BiMap} from 'react-icons/bi';
import SpotImage from '../Images/SpotImage';
import {getSpotById} from '../../store/spots';

const BookingPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [booking, setBooking] = useState('');
  const [spot, setSpot] = useState('');
  const [selectImage, setSelectImage] = useState('');

  useEffect(() => {
    dispatch(getSingleBookingThunk(id)).then(res => setBooking(res));
  }, [dispatch, id]);

  useEffect(() => {
    if (booking) {
      dispatch(getSpotById(booking?.Spot.id)).then(res => setSpot(res));
    }
  }, [booking, dispatch]);

  if (!booking || !spot) return null;

  return (
    <div className="container mx-auto">
      {!selectImage && <Header />}
      <div className="my-8">
        <h1 className="text-3xl mb-4">{booking.Spot?.title}</h1>
        <div className="flex flex-row items-center">
          <BiMap className="w-6 h-6 mr-1" />
          <LocationLink className="my-3 block">
            {booking.Spot?.city +
              ', ' +
              booking.Spot?.state +
              ', ' +
              booking.Spot?.country}
          </LocationLink>
        </div>
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between items-center">
          <div>
            <h2 className="sm:text-2xl text-xl mb-4 ">Your booking information</h2>
            <BookingDates
              booking={booking}
              className={'mb-2 mt-4 text-gray-500'}
            />
          </div>
          <div className="bg-site-primary sm:p-6 p-2  text-white rounded-2xl flex flex-col md:flex-row items.center justify-between">
            <div className="md:text-3xl text-base mr-2">Total price:</div>
            <div className="md:text-3xl text-xl">${booking.price}</div>
          </div>
        </div>
        {spot && (
          <div>
            <SpotImage spot={spot} setSelectImage={setSelectImage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
