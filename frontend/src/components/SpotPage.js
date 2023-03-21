import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {BiGridHorizontal} from 'react-icons/bi';
import {AiOutlineClose} from 'react-icons/ai';
import BookingWidget from './Booking/BookingWidget';
import {getSpotById} from '../store/spots';
import Header from './Header_footer/Header';

const SpotPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [spot, setSpot] = useState('');
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getSpotById(id)).then(res => setSpot(res));
  }, []);

  if (!spot) return null;
  // if (setShowAllPhotos) {
  //   return (
  //     <div className="absolute inset-0 bg-black text-white min-h-screen">
  //       <div className="p-8 grid gap-4 bg-black">
  //         <div>
  //           <h2 className="text-3xl mr-48">Photos of {spot.title}</h2>
  //           <button
  //             onClick={() => setShowAllPhotos(false)}
  //             className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black bg-white text-black">
  //             <AiOutlineClose />
  //             Close photos
  //           </button>
  //         </div>
  //         {spot?.photos?.length > 0 &&
  //           spot.photos.map(photo => (
  //             <div>
  //               <img src={photo.url} alt="" />
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Header />
      <div className="-mx-4 px-16 pt-3">
        <h1 className="text-3xl">{spot.title}</h1>
        <a
          className="flex gap-1 my-1 text-semibold underline"
          href={'https://maps.google.com/?q=' + spot.city + ', ' + spot.state}
          target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          {spot.address}
        </a>
        <div className="relative">
          <div className="grid gap-2 grid-cols-3 rounded-3xl overflow-hidden">
            <div className="col-span-2">
              {spot.spotImages[0] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer w-full object-cover"
                  src={spot.spotImages[0].url}
                />
              )}
            </div>

            <div className="grid">
              {spot.spotImages[1] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover"
                  src={spot.spotImages[1].url}
                />
              )}
              <div className="overflow-hidden">
                {spot.spotImages[2] && (
                  <img
                    onClick={() => setShowAllPhotos(true)}
                    className="aspect-square cursor-pointer object-cover relative"
                    src={spot.spotImages[2].url}
                  />
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 ">
            <BiGridHorizontal />
            Show more photos
          </button>
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
