import React, {useState, useEffect, useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {BsDot, BsFillStarFill} from 'react-icons/bs';
import {getSpotByIdThunk} from '../../store/spots';
import BookingWidget from '../Booking/BookingWidget';
import Header from '../Header_footer/Header';
import SpotImage from '../Images/SpotImage';
import LocationLink from './LocationLink';
import SpotReview from '../Reviews/SpotReview';
import RenderAmenities from './RenderAmenities';
import AmenitiesModal from '../Modals/AmenitiesModal';
import SpotDeletionModal from './SpotDeletionModal';
import {BiMap} from 'react-icons/bi';
// import Map from '../Map';

const SpotPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [spot, setSpot] = useState('');
  const [selectImage, setSelectImage] = useState(false);
  const [modal, setModal] = useState(false);
  const targetRef = useRef(null); // to create a reference to the target element
  const user = useSelector(state => state.session.user?.user);

  const showModal = Boolean => setModal(Boolean);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getSpotByIdThunk(id)).then(res => setSpot(res));
  }, []);

  //? formatting AM/PM time
  const formatTime = (time, isCheckIn) => {
    const hour = parseInt(time?.split(':')[0]);
    const amOrPm = hour >= 12 ? 'PM' : 'AM';
    if (isCheckIn) {
      return `${hour > 12 ? hour - 12 : hour}:00 ${amOrPm}`;
    } else {
      return `${((hour + 11) % 12) + 1}:00 ${amOrPm}`;
    }
  };

  const handleSpotEdit = e => {
    e.preventDefault();

    history.push(`/spots/${id}/edit`);
  };

  return (
    <>
      <div className="container mx-auto ">
        <Header />
        <div className="-mx-4 px-16 pt-3 f">
          <h1 className="text-4xl whitespace-nowrap">{spot.title}</h1>
          <div className="flex sm:flex-row flex-col items-center text-sm sm:text-base whitespace-nowrap justify-between mt-2 mb-4">
            <div className="flex flex-row items-center ">
              <div className="flex flex-row items-center ">
                <div className="flex flex-row items-center">
                  <BsFillStarFill className="w-4 h-4 mr-1" />
                  {spot.avgRating}
                </div>
                <BsDot className="mx-[2px]" />
                {spot.numReviews > 0 ? (
                  <div className="font-medium underline cursor-pointer hover:text-amber-600">
                    <a
                      href="#reviews"
                      onClick={() => targetRef.current.scrollIntoView()}>
                      {spot.numReviews} reviews
                    </a>
                  </div>
                ) : (
                  <div className="font-medium underline">0 reviews</div>
                )}
                <BsDot className="mx-[2px]" />
              </div>
              <div className="flex flex-row items-center">
                <BiMap className="w-6 h-6 mr-1" />
                <LocationLink className={'flex flex-row items-center'}>
                  {spot.city + ', ' + spot.state + ', ' + spot.country}
                </LocationLink>
              </div>
            </div>
          </div>
          {user?.id === spot?.ownerId && (
            <div className="my-2 flex flex-row items-center">
              <button
                className=" mr-4 ml-2 p-[4px]  bg-site-primary hover:bg-site-secondary hover:shadow-lg text-white rounded-lg"
                onClick={handleSpotEdit}>
                Modify
              </button>
              <SpotDeletionModal spotId={id} />
            </div>
          )}
          <div>
            <SpotImage spot={spot} setSelectImage={setSelectImage} />
          </div>

          <div className="mt-8 mb-2 gap-6 grid grid-cols-1 lg:grid-cols-3 pb-4 border-b">
            <div className="my-1 col-span-2 mr-3">
              <div
                className={`${
                  selectImage ? 'hidden' : 'flex flex-col justify-center'
                }`}>
                <div className="flex flex-row font-semibold items-center justify-between border-b">
                  <div className="opacity-80 sm:flex sm:flex-row grid grid-col-1 items-center mb-3 text-lg">
                    <div className="whitespace-nowrap">
                      {spot.maxGuests} guests
                    </div>
                    <BsDot className="sm:flex hidden mx-[2px]" />
                    <div className="whitespace-nowrap">
                      {`${spot.bedroom} ${
                        spot.bedroom > 1 ? 'bedrooms' : 'bedroom'
                      }`}
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
                  {/* <div>
                    <h2>This property is hosted by {}</h2>
                    <img src={spotOwner.profileImg} alt="host" className="" />
                  </div> */}
                </div>
              </div>
              <div className="border-b my-4">
                <h2 className="font-semibold text-2xl text-site-primary mt-1">
                  Description
                </h2>
                <p className="my-3">{spot.description}</p>
              </div>
              <div className={`${selectImage ? 'hidden' : 'border-b my-3'}`}>
                <h2 className="font-bold text-site-primary text-xl mb-2 ">
                  Check-in & Check-out times
                </h2>
                <div className="opacity-80">
                  <div className="mt-[5px] flex flex-row items-center">
                    Check-in:{' '}
                    <p className="font-bold ml-1">
                      {formatTime(spot.checkIn, true)}
                    </p>
                  </div>
                  <div className="my-[5px] flex flex-row items-center">
                    Check-out:{' '}
                    <p className="font-bold ml-1">
                      {formatTime(spot.checkOut, false)}
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl text-site-primary my-2">
                Top amenities
              </h2>

              <div className="grid sm:grid-cols-2 grid-cols-1">
                {spot.amenities &&
                  spot?.amenities.slice(0, 6).map((amenity, ind) => (
                    <div key={ind}>
                      <RenderAmenities amenity={amenity} />
                    </div>
                  ))}
              </div>
              {spot && spot.amenities.length > 6 && (
                <button
                  className="bg-site-primary hover:bg-site-secondary text-white my-3 mx-auto py-2 px-4 text-base rounded-md  sm:ml-[108px]  whitespace-nowrap"
                  onClick={() => setModal(!modal)}>
                  Show all {spot.amenities.length} amenities
                </button>
              )}
            </div>
            <div className="relative">
              <BookingWidget
                spot={spot}
                user={user}
                className="absolute top-0 right-0 bottom-0 left-0"
              />
            </div>
          </div>
          {spot && spot.spotReviews.length > 0 && (
            <div
              ref={targetRef}
              id="reviews"
              className={`${selectImage ? 'hidden' : 'block'}`}>
              <SpotReview spot={spot} />
            </div>
          )}
        </div>
        {/* <div className="my-4">
          <Map />
        </div> */}
      </div>

      {modal && (
        <AmenitiesModal showModal={showModal} amenities={spot.amenities} />
      )}
    </>
  );
};

export default SpotPage;
