import {useLocation} from 'react-router-dom';
import React from 'react';
import {format} from 'date-fns';

const Search = () => {
  const location = useLocation();

  // const { address, startDate, endDate, guestsNum } = location.query;

  // const formattedStartDate = format(new Date(startDate), "dd MMM yyyy");
  // const formattedEndDate = format(new Date(endDate), "dd MMM yyyy");
  // const range = `${formattedStartDate} - ${formattedEndDate}`;
  return (
    <div>
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p>{/* 300+ Stays - {range} - for {guestsNum} Guests */}</p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {/* Stays in {address} */}
          </h1>
          {/* <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button">Cancellation Flexibility</p>
                        <p className="button">Type of Place</p>
                        <p className="button">Price</p>
                        <p className="button">Room and Beds</p>
                        <p className="button">More Filters</p>
                    </div> */}
        </section>
      </main>
    </div>
  );
};

export default Search;
