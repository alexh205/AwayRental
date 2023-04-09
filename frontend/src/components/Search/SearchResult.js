import React from 'react';
import {FaRegHeart, FaStar} from 'react-icons/fa';
import {BsDot} from 'react-icons/bs';
import {useHistory} from 'react-router-dom';

const SearchResult = ({
  id,
  city,
  state,
  title,
  amenities,
  price,
  image,
  rating,
  type,
  bedroom,
  bathroom,
  bed,
  maxGuests,
  days,
}) => {
  const history = useHistory();
  const total = price * `${days || 1}`;

  return (
    <div
      onClick={() => history.push(`/spots/${id}`)}
      className="flex py-5 px-2 border-b cursor-pointer hover:opacity-75 hover:shadow-lg pr-5 transition duration-200 ease-out first:border-t">
      <div className="relative h-38 w-48 md:h-52 md:w-80 flex-shrink-0">
        <img
          src={image}
          alt="spot"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col flex-grow pl-5 ">
        <div className="flex justify-between ">
          <p className="text-sm sm:text-base text-gray-500">
            {city}, {state}
          </p>
          {/* <FaRegHeart className="h-5 w-5 cursor-pointer" /> */}
        </div>
        <h3 className="text-lg sm:text-2xl">{title}</h3>
        <div className="border-b w-32 pt-2" />
        <div className="pt-2 text-sm text-gray-500 flex-grow ">
          <p className="flex flex-row items-center">
            {bedroom} bd <BsDot /> {bathroom} ba <BsDot /> {bed} bds <BsDot />{' '}
            {maxGuests} guests
          </p>
          <div className="flex flex-col sm:items-center border sm:border-none sm:flex-row sm:space-x-1 mt-2 pl-1 sm:pl-0 text-[16px] text-black font-semibold">
            {' '}
            Amenities:
            {amenities.slice(0, 5).map((amenity, ind) => (
              <p
                className="text-sm font-light whitespace-nowrap first:border-none sm:border-l p-1"
                key={ind}>
                {amenity}
              </p>
            ))}
          </div>

          <div className="flex items-center mt-3 text-lg  text-black">
            Property:
            <p className="text-site-secondary ml-1 font-bold">{type}</p>
          </div>
        </div>
        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center text-xl">
            <FaStar className="h-6 w-6 text-red-400 mr-1 " /> {rating}
          </p>
          <div>
            <p className="text-lg lg:text-2xl font-semibold pb-2">
              {price
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
                .replace('.00', '')}{' '}
              / night
            </p>
            <p className="text-right font-extralight ">
              {total
                .toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })
                .replace('.00', '')}{' '}
              total
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
