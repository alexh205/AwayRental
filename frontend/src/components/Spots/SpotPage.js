import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  BsDot,
  BsFillStarFill,
  BsInfoCircle,
} from "react-icons/bs";
import { getSpotByIdThunk } from "../../store/spots";
import { getSpotReviewsThunk } from "../../store/reviews";
import BookingWidget from "../Booking/BookingWidget";
import Header from "../Header_footer/Header";
import Footer from "../Header_footer/Footer";
import SpotImage from "../Images/SpotImage";
import SpotReview from "../Reviews/SpotReview";
import LocationLink from "./LocationLink";
import RenderAmenities from "./RenderAmenities";
import AmenitiesModal from "../Modals/AmenitiesModal";
import SpotDeletionModal from "../Modals/SpotDeletionModal";
import { BiMap } from "react-icons/bi";
import { BsFillInfoCircleFill } from "react-icons/bs";
// import Map from '../Map';

const SpotPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [spot, setSpot] = useState("");
  const [selectImage, setSelectImage] =
    useState(false);
  const [modal, setModal] = useState(false);
  const targetRef = useRef(null); // to create a reference to the target element
  const user = useSelector(
    (state) => state.session.user?.user
  );
  const reviewObj = useSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    async function fetchData() {
      if (!id) {
        return;
      }
      const spotData = await dispatch(
        getSpotByIdThunk(id)
      );
      setSpot(spotData);
      await dispatch(getSpotReviewsThunk(id));
    }
    fetchData();
  }, [dispatch, id]);

  const showModal = (Boolean) =>
    setModal(Boolean);

  //? formatting AM/PM time
  const formatTime = (time, isCheckIn) => {
    const hour = parseInt(time?.split(":")[0]);
    const amOrPm = hour >= 12 ? "PM" : "AM";
    if (isCheckIn) {
      return `${
        hour > 12 ? hour - 12 : hour
      }:00 ${amOrPm}`;
    } else {
      return `${
        ((hour + 11) % 12) + 1
      }:00 ${amOrPm}`;
    }
  };

  const numReviews =
    Object.values(reviewObj).length;
  let ratingTotal = 0;

  Object.values(reviewObj).forEach((review) => {
    if (review.stars) ratingTotal += review.stars;
  });

  let avgRating;

  ratingTotal > 0
    ? (avgRating =
        Math.round(
          (ratingTotal / numReviews) * 100
        ) / 100)
    : (avgRating = 0);

  const handleSpotEdit = (e) => {
    e.preventDefault();

    history.push(`/spots/${id}/edit`);
  };

  return (
    <>
      <div className="mx-auto">
        <Header />
        <div className=" flex items-center justify-center">
          <div className="mx-10 pt-14 w-2/3">
            <h1 className="text-2xl text-gray-700 whitespace-nowrap font-light uppercase tracking-wider">
              {spot.title}
            </h1>
            <div className="flex sm:flex-row flex-col items-center text-sm sm:text-base whitespace-nowrap justify-between mt-2 mb-4">
              <div className="flex flex-row items-center bg-[#fafafa] px-10 py-2 rounded-xl text-sm text-gray-500 shadow-md">
                <div className="flex flex-row items-center ">
                  <div className="flex flex-row items-center ">
                    <BsFillStarFill className="w-4 h-4 mr-2 text-[#ffd700]" />

                    {avgRating}
                  </div>
                  <BsDot className="mx-[2px]" />
                  {Object.values(reviewObj)
                    .length > 0 ? (
                    <div className="font-medium cursor-pointer hover:text-amber-600">
                      <a
                        href="#reviews"
                        onClick={() =>
                          targetRef.current.scrollIntoView()
                        }
                      >
                        {
                          Object.values(reviewObj)
                            .length
                        }{" "}
                        reviews
                      </a>
                    </div>
                  ) : (
                    <div className="font-medium">
                      0 reviews
                    </div>
                  )}
                  <BsDot className="mx-[2px]" />
                </div>
                <div className="flex flex-row items-center">
                  <BiMap className="w-6 h-6 mr-1" />
                  <LocationLink
                    className={
                      "flex flex-row items-center no-underline"
                    }
                  >
                    {spot.city +
                      ", " +
                      spot.state +
                      ", " +
                      spot.country}
                  </LocationLink>
                </div>
              </div>
              {user?.id === spot?.ownerId && (
                <div className="md:my-0 my-2 flex flex-row items-center md:mr-2 mr-0">
                  <button
                    className=" mr-4 ml-2 p-[4px]  bg-site-primary hover:bg-site-secondary hover:shadow-lg text-white rounded-lg"
                    onClick={handleSpotEdit}
                  >
                    Modify
                  </button>
                  <SpotDeletionModal
                    spotId={id}
                  />
                </div>
              )}
            </div>

            <div className="mt-10 w-2/3">
              <SpotImage
                spot={spot}
                setSelectImage={setSelectImage}
              />
            </div>

            <div className="mt-8 mb-2 gap-6 grid grid-cols-1 lg:grid-cols-3 pb-4 border-b">
              <div className="my-1 col-span-2 mr-3">
                <div
                  className={`${
                    selectImage
                      ? "hidden"
                      : "flex flex-col justify-center"
                  }`}
                >
                  <div className="flex flex-row font-semibold items-center justify-between border-b">
                    <div className="sm:flex sm:flex-row grid grid-col-1 items-center mb-3 text-sm  text-gray-500 bg-[#fafafa] px-10 py-2 rounded-xl shadow-md font-normal">
                      <BsFillInfoCircleFill className="w-4 h-4 mr-2 text-site-primary" />
                      <div className="whitespace-nowrap">
                        {spot.maxGuests} guests
                      </div>
                      <BsDot className="sm:flex hidden mx-[2px]" />
                      <div className="whitespace-nowrap">
                        {`${spot.bedroom} ${
                          spot.bedroom > 1
                            ? "bedrooms"
                            : "bedroom"
                        }`}
                      </div>
                      <BsDot className="sm:flex hidden mx-[2px]" />
                      <div className="whitespace-nowrap">{`${
                        spot.bed
                      } ${
                        spot.bed > 1
                          ? "beds"
                          : "bed"
                      }`}</div>
                      <BsDot className="sm:flex hidden mx-[2px]" />
                      <div className="whitespace-nowrap">
                        {`${spot.bathroom} ${
                          spot.bathroom > 1
                            ? "bathrooms"
                            : "bathroom"
                        }`}
                      </div>
                    </div>
                    {/* <div>
                    <h2>This property is hosted by {}</h2>
                    <img src={spotOwner.profileImg} alt="host" className="" />
                  </div> */}
                  </div>
                </div>
                <div className="border-b my-6">
                  <h3 className="text-lg text-gray-700 mt-3 font-medium">
                    Description
                  </h3>
                  <p className="my-2 text-gray-600 text-sm">
                    {spot.description}
                  </p>
                </div>
                <div
                  className={`${
                    selectImage
                      ? "hidden"
                      : "border-b my-3 pb-3"
                  }`}
                >
                  <h3 className="text-lg text-gray-700 mt-4 font-medium">
                    Check-in/out Info
                  </h3>
                  <div className="opacity-80 bg-gray-800 text-sm text-gray-200 px-5 py-2 w-1/2 rounded-md shadow-md">
                    <div className="mt-[5px] flex flex-row items-center">
                      Check-in:{" "}
                      <p className="font-bold ml-1">
                        {formatTime(
                          spot.checkIn,
                          true
                        )}
                      </p>
                    </div>
                    <div className="flex flex-row items-center">
                      Check-out:{" "}
                      <p className="font-bold ml-1">
                        {formatTime(
                          spot.checkOut,
                          false
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="text-lg text-gray-700 mt-8 font-medium">
                  Top Amenities
                </h2>

                <div className="grid sm:grid-cols-2 grid-cols-1 text-sm bg-[#fafafa] shadow w-2/3 px-6 py-4 rounded-md ">
                  {spot.amenities &&
                    spot?.amenities
                      .slice(0, 6)
                      .map((amenity, ind) => (
                        <div key={ind}>
                          <RenderAmenities
                            amenity={amenity}
                          />
                        </div>
                      ))}
                </div>
                {spot &&
                  spot.amenities.length > 6 && (
                    <button
                      className="bg-gray-600 hover:bg-gray-800 text-white my-3 mx-auto py-2 px-4 text-sm rounded-md  sm:ml-[108px] whitespace-nowrap"
                      onClick={() =>
                        setModal(!modal)
                      }
                    >
                      Show all{" "}
                      {spot.amenities.length}{" "}
                      amenities
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
            {Object.values(reviewObj).length >
              0 && (
              <div
                ref={targetRef}
                id="reviews"
                className={`${
                  selectImage ? "hidden" : "block"
                }`}
              >
                <SpotReview spot={spot} />
              </div>
            )}
          </div>
        </div>
        {/* <div className="my-4">
          <Map />
        </div> */}
      </div>

      {modal && (
        <AmenitiesModal
          showModal={showModal}
          amenities={spot.amenities}
        />
      )}
      <Footer />
    </>
  );
};

export default SpotPage;
