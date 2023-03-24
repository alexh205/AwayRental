import React, {useEffect, useState} from 'react';
import Header from '../Header_footer/Header';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../Header_footer/Footer';
import SpotFeed from '../Spots/SpotFeed';
import Filters from '../Search/Filters';
import {getAllSpots} from '../../store/spots';

function Home() {
  const dispatch = useDispatch();
  const spotsArr = useSelector(state => state.spots);
  useEffect(() => {
    dispatch(getAllSpots());
  }, []);

  return (
    <div>
      <Header />
      <Filters />
      <div>
        <SpotFeed spots={spotsArr} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
