import React, {useEffect} from "react";
import Rentals from "../Rentals";
import Header from "../Header_footer/Header";
import Footer from "../Header_footer/Footer";
import Filters from "../Search/Filters";
import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";

function Home() {
    const dispatch = useDispatch();

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
            <Rentals spots={spots}/>
            <Footer />
        </>
    );
}

export default Home;
