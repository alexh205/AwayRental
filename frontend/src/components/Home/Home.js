import React from "react";
import Rentals from "../../Rentals";
import Header from "../Header_footer/Header";
import Footer from "../Header_footer/Footer";
import Filters from "../Search/Filters";

function Home() {
    return (
        <>
            <Header />
            <Filters />

            <Rentals />

            <Footer />
        </>
    );
}

export default Home;
