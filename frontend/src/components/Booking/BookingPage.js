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
import {BsPeopleFill} from 'react-icons/bs';
import {BsDot} from 'react-icons/bs';

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

  // formatting AM/PM time
  const formatTime = (time, isCheckIn) => {
    const hour = parseInt(time?.split(':')[0]);
    const amOrPm = hour >= 12 ? 'PM' : 'AM';
    if (isCheckIn) {
      return `${hour > 12 ? hour - 12 : hour}:00 ${amOrPm}`;
    } else {
      return `${((hour + 11) % 12) + 1}:00 ${amOrPm}`;
    }
  };

  if (!booking || !spot) return null;

  return (
    <div className="container mx-auto">
      {!selectImage && <Header />}
      <div className="my-8">
        <h1 className="text-4xl mb-4">{booking.Spot?.title}</h1>
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
        <div className="bg-gray-200 p-6 my-6 rounded-2xl flex justify-between">
          <div>
            <h2 className="sm:text-2xl text-xl mb-4 ">
              Your booking information
            </h2>
            <div className="flex justify-center items-start md:items-center md:flex-row flex-col">
              <BookingDates booking={booking} className={' text-gray-500'} />
              <div className="flex flex-row items-center text-center text-lg mx-3 md:my-2 my-0">
                <BsPeopleFill className="w-6 h-6 mr-1" /> Guests:{' '}
                {booking.guestsNum}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-site-primary sm:p-6 p-4 text-white rounded-2xl flex flex-row items.center justify-center h-[3rem] sm:h-auto whitespace-nowrap">
              <div className="md:text-2xl text-base mr-2">Total price:</div>
              <div className="md:text-2xl text-xl">${booking.price}</div>
            </div>
          </div>
        </div>
        <div className="p-5 my-4 border-4 border-double rounded-xl flex lg:flex-row flex-col ">
          <h2 className="text-xl font-semibold md:mr-2 mr-0 whitespace-nowrap">
            Location detail:
          </h2>
          <div className="opacity-80 sm:flex sm:flex-row grid grid-col-1 items-center text-lg">
            <div className="whitespace-nowrap">
              {`${spot.bedroom} ${spot.bedroom > 1 ? 'bedrooms' : 'bedroom'}`}
            </div>
            <BsDot className="sm:flex hidden mx-[2px]" />
            <div className="whitespace-nowrap">{`${spot.bed} ${
              spot.bed > 1 ? 'beds' : 'bed'
            }`}</div>
            <BsDot className="sm:flex hidden mx-[2px]" />
            <div className="whitespace-nowrap">
              {`${spot.bathroom} ${
                spot.bathroom > 1 ? 'bathrooms' : 'bathroom'
              }`}
            </div>
          </div>
          <div className="mx-1 hidden lg:flex">/</div>
          <div className="opacity-80 flex flex-row items-center ">
            <div className=" flex flex-row items-center text-lg">
              Check-in:{' '}
              <p className="font-bold ml-1 text-base">
                {formatTime(spot.checkIn, true)}
              </p>
            </div>
            <div className=" flex flex-row items-center ml-2">
              Check-out:{' '}
              <p className="font-bold ml-1">
                {formatTime(spot.checkOut, false)}
              </p>
            </div>
          </div>
        </div>
        {spot && (
          <div className="mb-5">
            <SpotImage spot={spot} setSelectImage={setSelectImage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
