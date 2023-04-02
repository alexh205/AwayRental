import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Header from '../Header_footer/Header';
import {getSingleBookingThunk} from '../../store/bookings';
import {useDispatch} from 'react-redux';
import LocationLink from '../Spots/LocationLink';
import BookingDates from './BookingDates';
import {BiMap} from 'react-icons/bi';
import {getSpotByIdThunk} from '../../store/spots';
import {BsPeopleFill} from 'react-icons/bs';
import {BsDot} from 'react-icons/bs';
import CreateReviewModal from '../Reviews/CreateReviewModal';

const BookingPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [booking, setBooking] = useState('');
  const [spot, setSpot] = useState('');
  const [selectImage, setSelectImage] = useState('');
  const [stay, setStay] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [modal, setModal] = useState(false);

  const showModal = Boolean => setModal(Boolean);

  useEffect(() => {
    dispatch(getSingleBookingThunk(id)).then(res => setBooking(res));
  }, [dispatch, id]);

  useEffect(() => {
    if (booking) {
      dispatch(getSpotByIdThunk(booking?.Spot.id)).then(res => setSpot(res));
    }
  }, [booking, dispatch]);

  //* formatting AM/PM time
  const formatTime = (time, isCheckIn) => {
    const hour = parseInt(time?.split(':')[0]);
    const amOrPm = hour >= 12 ? 'PM' : 'AM';
    if (isCheckIn) {
      return `${hour > 12 ? hour - 12 : hour}:00 ${amOrPm}`;
    } else {
      return `${((hour + 11) % 12) + 1}:00 ${amOrPm}`;
    }
  };

  const handlePhotoClick = e => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };

  //! only review past stays
  const currentDate = new Date();
  const stayEnd = new Date(booking.endDate);

  useEffect(() => {
    if (currentDate.getTime() >= stayEnd.getTime()) {
      setStay(true);
    }
    spot.spotReviews?.find(review => {
      if (review.userId === booking.userId) {
        setReviewed(true);
      }
    });
  }, [currentDate]);

  if (!booking || !spot) return null;

  return (
    <div className="container mx-auto h-fit">
      {!selectImage && <Header />}
      <div className="my-8">
        <h1 className="text-4xl mb-3">{booking.Spot?.title}</h1>
        <div className="flex flex-row items-center">
          <h3 className="mr-2 text-xl font-semibold text-site-primary">
            Location:
          </h3>
          <BiMap className="w-6 h-6 mr-1" />
          <LocationLink className="my-3 block">
            {booking.Spot?.city +
              ', ' +
              booking.Spot?.state +
              ', ' +
              booking.Spot?.country}
          </LocationLink>
        </div>
        {stay && !reviewed && (
          <div className="border-y">
            {!modal && (
              <div className="my-4 flex md:flex-row flex-col items-center md:justify-around ">
                <h2 className="md:text-xl text-lg">
                  We hope you had a wonderful stay, and we hope that you share
                  your experience with us
                </h2>
                <button
                  className=" text-white text-lg shadow-lg hover:bg-site-secondary font-semibold p-[5px] rounded-2xl bg-site-primary whitespace-nowrap"
                  onClick={e => {
                    e.preventDefault();
                    setModal(true);
                  }}>
                  Write a review
                </button>
              </div>
            )}
            {modal && <CreateReviewModal spot={spot} showModal={showModal} />}
          </div>
        )}
        <div className="bg-gray-200 p-6 my-5 rounded-2xl flex justify-between">
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
            <div className="bg-site-primary sm:p-6 p-3 text-white rounded-2xl flex flex-row items.center justify-center h-[2.8rem] sm:h-auto whitespace-nowrap">
              <div className="md:text-2xl text-lg mr-2">Total price:</div>
              <div className="md:text-2xl text-lg">
                {booking.price
                  ?.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })
                  .replace('.00', '')}{' '}
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 my-4 border-4 border-double rounded-xl flex lg:flex-row flex-col ">
          <h2 className="text-xl font-semibold md:mr-2 mr-0 whitespace-nowrap">
            General details:
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
            <div className=" flex flex-row text-lg items-center ml-2">
              Check-out:{' '}
              <p className="font-bold ml-1 text-base">
                {formatTime(spot.checkOut, false)}
              </p>
            </div>
          </div>
        </div>

        {spot && (
          <div className="mb-5  flex justify-center max-h-[1000px]">
            <img
              src={spot.spotImages[0].url}
              alt="spot"
              className="object-cover max-w-auto h-auto rounded-2xl outline-none hover:shadow-xl transform transition duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={e => handlePhotoClick(e)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
