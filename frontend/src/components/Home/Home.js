import React, { useEffect } from 'react';
import Rentals from '../Rentals';
import Header from '../Header_footer/Header';
import Footer from '../Header_footer/Footer';
import Filters from '../Search/Filters';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spots';
import RentalFeed from '../RentalFeed';

function Home() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(spotActions.getAllSpots());
    }, [dispatch]);

    let spots;
    const spotsList = useSelector(state => state.spots);
    if (spotsList) spots = Object.values(spotsList);
    return (
        <>
            <Header />
            <Filters />
            <RentalFeed spots={spots} user={user} />
            {/* <Rentals spots={spots}/> */}
            <Footer />
        </>
    );
}

export default Home;
