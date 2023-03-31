import React, {useEffect, useState} from 'react';
import Header from '../Header_footer/Header';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../Header_footer/Footer';
import SpotCard from '../Spots/SpotCard';
import Filters from '../Search/Filters';
import {getAllSpotsThunk} from '../../store/spots';

function Home() {
  const dispatch = useDispatch();
  const spotsArr = useSelector(state => state.spots.spots);
  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, []);

  return (
    <div className="mb-14">
      <Header />
      <Filters />
      <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-y-1 gap-x-1 px-7">
        {Object.values(spotsArr)
          .slice(0, 6)
          .map(spot => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
        {Object.values(spotsArr)
          .slice(7, 12)
          .map(spot => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
        {Object.values(spotsArr)
          .slice(13, 20)
          .map(spot => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
