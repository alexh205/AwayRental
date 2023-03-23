import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import BookingWidget from '../Booking/BookingWidget';
import {getSpotById} from '../../store/spots';
import Header from '../Header_footer/Header';
import SpotImage from '../Images/SpotImage';
import LocationLink from './LocationLink';
import {BsDot} from 'react-icons/bs';
import {CiHeart} from 'react-icons/ci';
import SpotReview from '../Reviews/SpotReview';
import RenderAmenities from './RenderAmenities';
import AmenitiesModal from '../Modals/AmenitiesModal';

const SpotPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [spot, setSpot] = useState('');
  const [selectImage, setSelectImage] = useState(false);
  const [modal, setModal] = useState(false);
  const targetRef = useRef(null); // to create a reference to the target element

  const showModal = Boolean => setModal(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getSpotById(id)).then(res => setSpot(res));
  }, []);
  // console.log(spot.amenities.split(','));

  return (
    <>
      <div className="container mx-auto">
        {!selectImage && <Header />}
        <div className="-mx-4 px-16 pt-3 f">
          <h1 className="text-3xl">{spot.title}</h1>
          <div className="flex flex-row items-center text-sm sm:text-base whitespace-nowrap justify-between mt-2 mb-6">
            <div className="flex flex-row items-center ">
              <div className="flex flex-row items-center ">
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
                </div>
                <BsDot className="mx-[2px]" />
                {spot.numReviews > 0 ? (
                  <div className="font-medium underline cursor-pointer">
                    <a
                      href="#reviews"
                      onClick={() => targetRef.current.scrollIntoView()}>
                      {spot.numReviews} reviews
                    </a>
                  </div>
                ) : (
                  <a
                    href="#reviews"
                    onClick={() => targetRef.current.scrollIntoView()}>
                    <div className="font-medium underline">0 reviews</div>
                  </a>
                )}
                <BsDot className="mx-[2px]" />
              </div>
              <LocationLink className={'flex flex-row items-center'}>
                {spot.city + ', ' + spot.state + ', ' + spot.country}
              </LocationLink>
            </div>
            <div className="underline flex items-center p-2 hover:bg-gray-100 hover:rounded-xl cursor-pointer">
              <CiHeart className="w-5 h-5 mr-1" />
              Save
            </div>
          </div>
          <div>
            <SpotImage
              spot={spot}
              setSelectImage={setSelectImage}
              selectImage={selectImage}
            />
          </div>

          <div className="mt-8 mb-2 gap-8 grid grid-cols-1 md:grid-cols-3 pb-4 border-b">
            <div className="my-1 col-span-2 mr-6">
              <div
                className={`${
                  selectImage ? 'hidden' : 'flex flex-col justify-center'
                }`}>
                <div className="flex flex-row items-center justify-between border-b">
                  <div className="opacity-80 flex flex-row items-center mb-3 text-lg">
                    <div>{spot.maxGuests} guests</div>
                    <BsDot className="mx-[2px]" />
                    <div>{spot.bedroom} bedrooms</div>
                    <BsDot className="mx-[2px]" />
                    <div>{spot.bed} beds</div>
                    <BsDot className="mx-[2px]" />
                    <div>{spot.bath} bathrooms</div>
                  </div>
                  <div>
                    {/* <img src={spotOwner.profileImg} alt="host" className="" /> */}
                  </div>
                </div>
              </div>
              <div className="border-b my-4">
                <h2 className="font-semibold text-2xl mt-1">Description</h2>
                <p className="my-3">{spot.description}</p>
              </div>
              <div className="border-b my-3">
                <h2 className="font-semibold text-xl">
                  Check-in & Check-out times
                </h2>
                <div className="opacity-80">
                  <div className="mt-[5px] flex flex-row items-center">
                    Check-in:{' '}
                    <p className="font-bold ml-2">{spot.checkIn} PM</p>
                  </div>
                  <div className="my-[5px] flex flex-row items-center">
                    Check-out:{' '}
                    <p className="font-bold ml-1">{spot.checkOut} AM</p>
                  </div>
                </div>
              </div>

              <h2 className="font-semibold text-2xl my-2">Top amenities</h2>

              <div className="grid sm:grid-cols-2 grid-cols-1">
                {spot &&
                  spot.amenities
                    .split(',')
                    .slice(0, 6)
                    .map((amenity, ind) => (
                      <div key={ind}>
                        <RenderAmenities amenity={amenity} />
                      </div>
                    ))}
                {spot && spot.amenities && (
                  <button
                    className="bg-site-primary text-white my-3 mx-20 py-2 text-lg rounded-md"
                    onClick={() => setModal(!modal)}>
                    Show all {spot.amenities.split(',').length} amenities
                  </button>
                )}
              </div>
            </div>
            <div className={`${selectImage ? 'hidden' : 'relative'}`}>
              <BookingWidget
                spot={spot}
                className="absolute top-0 right-0 bottom-0 left-0"
              />
            </div>
          </div>
          <div ref={targetRef} id="reviews">
            <SpotReview spot={spot} />
          </div>
        </div>
      </div>

      {modal && (
        <AmenitiesModal
          showModal={showModal}
          amenities={spot.amenities.split(',')}
          modal={modal}
        />
      )}
    </>
  );
};

export default SpotPage;
