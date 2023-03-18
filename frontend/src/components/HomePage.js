import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from './Header_footer/Header';
import Filter from './Search/Filter';
import {Link} from 'react-router-dom';
import Image from './Image';

const HomePage = () => {
  const [spots, setSpots] = useState([]);

  return (
    <>
      {/* <Header /> */}
      <Filter />

      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {spots.length > 0 &&
          spots.map(spot => (
            <Link to={'/spot/' + spot._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {spot.photos?.[0] && (
                  <Image
                    className="rounded-2xl object-cover aspect-square"
                    src={spot.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{spot.address}</h2>
              <h3 className="text-sm text-gray-500">{spot.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${spot.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default HomePage;
