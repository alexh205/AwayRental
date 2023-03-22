import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import BookingWidget from './Booking/BookingWidget';
import {getSpotById} from '../store/spots';
import Header from './Header_footer/Header';
import SpotImage from './SpotImage';
import LocationLink from './LocationLink';
import {BsDot} from 'react-icons/bs';

const SpotPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [spot, setSpot] = useState('');
  const [selectImage, setSelectImage] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getSpotById(id)).then(res => setSpot(res));
  }, [id]);

  return (
    <>
      {!selectImage && <Header />}

      <div className="-mx-4 px-16 pt-3 f">
        <h1 className="text-3xl">{spot.title}</h1>
        <div className="flex flex-row items-center text-base mt-2 mb-6">
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
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
              {spot.avgRating}
            </div>{' '}
            <BsDot className="mx-1" />
            <div className="font-medium underline">
              {spot.reviewsTotal} reviews
            </div>{' '}
            <BsDot className="mx-1" />
          </div>
          <LocationLink className={'flex flex-row items-center'}>
            {spot.city + ', ' + spot.state}
          </LocationLink>
        </div>
        <div>
          <SpotImage
            spot={spot}
            setSelectImage={setSelectImage}
            selectImage={selectImage}
          />
        </div>

        <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {spot.description}
          </div>
          <div>
            Check-in: {spot.checkIn}
            <br />
            Check-out: {spot.checkOut}
            <br />
            Max number of guests: {spot.maxGuests}
          </div>
          <div>
            <BookingWidget spot={spot} />
          </div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            extra information
          </div>
        </div>
      </div>
    </>
  );
};

export default SpotPage;
