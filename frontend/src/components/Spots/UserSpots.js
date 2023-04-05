import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userSpotsByIdThunk} from '../../store/spots';
import {HiOutlinePlus} from 'react-icons/hi';

const UserSpots = ({setSelected, spots, setSpots = () => {}}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user?.user);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (user?.id) {
      dispatch(userSpotsByIdThunk(user.id)).then(res => setSpots(res));
    }
  }, [dispatch, user?.id, setSpots]);

  const visibleSpots = spots.slice(0, 6);
  const hiddenSpots = spots.slice(6);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <Link
          className="inline-flex items-center gap-1 bg-site-primary hover:bg-site-secondary text-white py-2 px-6 rounded-full"
          onClick={() => setSelected(true)}
          to="/account/spots/new">
          <HiOutlinePlus className='h-6 w-6'/>
          Add a new spot
        </Link>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleSpots.map(spot => (
          <Link
            key={spot.id}
            to={`/spots/${spot.id}`}
            className="group block w-full h-full rounded-lg overflow-hidden hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-site-primary border-dashed border-2 hover:border-none">
            <div className="relative h-32 pb-2/3">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={spot.spotImages?.[0]?.url}
                alt={spot.title}
              />
            </div>
            <div className="px-4 py-2">
              <h2 className="text-2xl font-medium text-gray-900 group-hover:text-site-primary">
                {spot.title}
              </h2>
              <div className="flex flex-row items-center mt-2">
                <p className="mr-2 text-lg">Property type:</p>
                <p className=" text-base text-gray-500">{spot.type}</p>
              </div>
              <div className="flex flex-row items-center">
                <p className="mr-3 text-lg">Address:</p>
                <div className="flex flex-col">
                  <p className="mt-2 text-base text-gray-500">{spot.address}</p>
                  <div className="flex flex-row">
                    <p className="mt-2 text-base text-gray-500">{spot.city}</p>
                    <p className="mt-2 text-base text-gray-500">
                      , {spot.state}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row mt-2 items-center">
                <p className="mr-3 flex items-center">Price:</p>

                <div className=" text-base font-medium text-site-primary flex items-center">
                  {spot.price
                    ?.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })
                    .replace('.00', '')}
                  <p className="text-gray-500 text-xs ml-1">(per night)</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-1 text-site-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-3-6a3 3 0 116 0 3 3 0 01-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-gray-500">
                    {spot.bedroom} bd | {spot.bathroom} ba | {spot.bed} bds |{' '}
                    {spot.maxGuests} guests
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {hiddenSpots.length > 0 && (
          <>
            {expanded
              ? hiddenSpots.map(spot => {
                  return (
                    <Link
                      key={spot.id}
                      to={`/spots/${spot.id}`}
                      className="group block w-full h-full rounded-lg overflow-hidden hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-site-primary border-dashed border-2 hover:border-none">
                      <div className="relative h-32 pb-2/3">
                        <img
                          className="absolute inset-0 w-full h-full object-cover"
                          src={spot.spotImages?.[0]?.url}
                          alt={spot.title}
                        />
                      </div>
                      <div className="px-4 py-2 ml-3">
                        <h2 className="text-2xl font-medium text-gray-900 group-hover:text-site-primary">
                          {spot.title}
                        </h2>
                        <div className="flex flex-row items-center mt-2">
                          <p className="text-lg mr-2">Property type:</p>
                          <p className=" text-base text-gray-500">
                            {spot.type}
                          </p>
                        </div>
                        <div className="flex flex-row items-center">
                          <p className="mr-3 text-lg">Address:</p>
                          <div className="flex flex-col">
                            <p className="mt-2 text-base text-gray-500">
                              {spot.address}
                            </p>
                            <div className="flex flex-row">
                              <p className="mt-2 text-base text-gray-500">
                                {spot.city}
                              </p>
                              <p className="mt-2 text-base text-gray-500">
                                , {spot.state}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row mt-2 items-center">
                          <p className="mr-3 flex items-center text-lg">
                            Price:
                          </p>

                          <div className=" text-base font-medium text-site-primary flex items-center">
                            {spot.price
                              ?.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                              })
                              .replace('.00', '')}
                            <p className="text-gray-500 text-xs ml-1">
                              (per night)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1 text-site-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true">
                              <path
                                fillRule="evenodd"
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm-3-6a3 3 0 116 0 3 3 0 01-6 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <p className="text-sm text-gray-500">
                              {spot.bedroom} bd | {spot.bathroom} ba |{' '}
                              {spot.bed} bds | {spot.maxGuests} guests
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : null}
          </>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex items-center justify-center mt-2 mb-4 w-[200px]">
          <button
            onClick={() => setExpanded(!expanded)}
            className={`${
              spots.length <= 4
                ? 'hidden'
                : 'p-2 w-full rounded-2xl bg-site-primary hover:bg-site-secondary text-xl text-white'
            }`}>
            {expanded ? 'Hide' : `Show all (${spots.length})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSpots;
