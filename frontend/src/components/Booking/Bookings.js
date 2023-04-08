import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUserBookings} from '../../store/bookings';
import {ImCreditCard} from 'react-icons/im';
import BookingDates from './BookingDates';
import {BsPeopleFill} from 'react-icons/bs';

const Bookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings);
  const bookingArr = Object.values(bookings);
  useEffect(() => {
    dispatch(getUserBookings());
  }, [dispatch]);

  if (bookingArr.length === 0)
    return (
      <div className="flex items-center justify-center container mx-auto">
        <p className="text-xl font-medium">
          You currently do not have any booking history!
        </p>
      </div>
    );

  return (
    <div className="flex justify-center">
      <div className="container grid lg:grid-cols-2 grid-cols-1 gap-4 mx-2">
        {bookingArr?.length > 0 &&
          bookingArr.map((booking, ind) => (
            <Link
              key={ind}
              to={`/bookings/${booking.id}`}
              className="flex bg-gray-200 rounded-2xl my-2 first-line:overflow-hidden hover:shadow-2xl">
              <div className="w-48 h-full md:h-52 mr-5">
                <img
                  src={booking.Spot?.previewImage}
                  alt="spot"
                  className="object-fill h-full w-full rounded-l-2xl"
                />
              </div>
              <div className="py-3 pr-2 flex-grow ml-2 ">
                <h2 className="md:text-2xl text-xl font-semibold md:mt-1 mt-3">
                  {booking.Spot?.title}
                </h2>
                <div className="md:text-lg text-base">
                  <BookingDates
                    booking={booking}
                    className="md:my-3 my-5 text-gray-500 sm:flex-row flex-col"
                  />
                  <div className="flex md:gap-2 gap-3 items-center md:mt-2 mt-0">
                    <ImCreditCard className="w-7 h-7" />
                    <span className="md:text-xl text-base text-center flex flex-row items-center">
                      Total price:{' '}
                      <p className="ml-1 md:text-2xl text-lg">
                        {' '}
                        {booking.price
                          ?.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                          })
                          .replace('.00', '')}
                      </p>
                    </span>
                  </div>

                  <div className="md:mt-2 mt-4">
                    <div className="flex items-center">
                      <BsPeopleFill className="w-6 h-6 mr-1" /> Guests:{' '}
                      <p className="ml-2 text-lg font-semibold">
                        {booking.guestsNum}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Bookings;
