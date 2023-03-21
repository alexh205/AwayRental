import React, {useEffect} from 'react';
import Header from '../Header_footer/Header';
import {useDispatch, useSelector} from 'react-redux';
import Footer from '../Header_footer/Footer';
import SpotFeed from '../SpotFeed';
import Filters from '../Search/Filters';
import {getAllSpots} from '../../store/spots';

function Home() {
  const dispatch = useDispatch();
  const spotsList = useSelector(state => state.spots);
  const spotsArr = Object.values(spotsList);

  useEffect(() => {
    dispatch(getAllSpots());
  }, []);
  return (
    <>
      <Header />
      <Filters />
      <div >
        <SpotFeed spots={spotsArr} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
