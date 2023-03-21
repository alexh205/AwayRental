import React, {useEffect} from 'react';
import Header from '../Header_footer/Header';
import {useSelector} from 'react-redux';
import Footer from '../Header_footer/Footer';
import SpotFeed from '../SpotFeed';
import Filters from '../Search/Filters';

function Home() {
  const spotsList = useSelector(state => state.spots);
  const spotsArr = Object.values(spotsList);
  return (
    <>
      <Header />
      <Filters />
      <div className="mb-12 mx-7">
        <SpotFeed spots={spotsArr} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
