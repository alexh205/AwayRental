import React from "react";
import SpotsHolder from "./SpotsHolder";
import Header from "../Header_footer/Header";
import Footer from "../Header_footer/Footer";

function Home() {
    return (
        <>
            <Header />
            <div className="pl-14 pr-14">
                <SpotsHolder />
            </div>
            <Footer />
        </>
    );
}

export default Home;
