import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../Header_footer/Header';


const BookingPage = () => {
  const {id} = useParams();

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className="my-8">Hello</div>
    </>
  );
};

export default BookingPage;
