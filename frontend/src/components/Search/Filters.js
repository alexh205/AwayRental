import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaUmbrellaBeach } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import { BsHouseFill } from "react-icons/bs";
import {
  GiFishingBoat,
  GiTreehouse,
  GiWoodCabin,
  GiIsland,
  GiFarmTractor,
} from "react-icons/gi";
import {
  MdApartment,
  MdOutlineBedroomParent,
} from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";
import { AiOutlineClear } from "react-icons/ai";
import Filter from "./Filter";
import Header from "../Header_footer/Header";
import { getAllSpotsThunk } from "../../store/spots";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import SpotCard from "../Spots/SpotCard";
import Footer from "../Header_footer/Footer";
import { FiArrowRight } from "react-icons/fi";

const Filters = () => {
  const { filterId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (filterId)
      dispatch(
        getAllSpotsThunk({
          type: `${filterId}`,
          page: 1,
          size: 20,
        })
      );
  }, [dispatch, filterId]);

  useEffect(() => {
    if (!filterId)
      dispatch(
        getAllSpotsThunk({ page: 1, size: 20 })
      );
  }, [dispatch, filterId]);

  const spotsArr = useSelector(
    (state) => state.spots.spots
  );

  const options = [
    { title: "House", icon: <BsHouseFill /> },
    { title: "Apartment", icon: <MdApartment /> },
    { title: "Cabin", icon: <GiWoodCabin /> },
    {
      title: "Lakefront",
      icon: <FaUmbrellaBeach />,
    },
    { title: "Treehouse", icon: <GiTreehouse /> },
    {
      title: "Houseboat",
      icon: <GiFishingBoat />,
    },
    {
      title: "Room",
      icon: <MdOutlineBedroomParent />,
    },
    {
      title: "Cottage",
      icon: <TbBuildingCottage />,
    },
    { title: "Farm", icon: <GiFarmTractor /> },
    { title: "Island", icon: <GiIsland /> },
    { title: "Reset", icon: <AiOutlineClear /> },
  ];

  return (
    <div className="">
      <Header />
      <div className="0">
        {/* Hero Banner */}
        <div className="bg-gray-800 bg-opacity-80">
          <section className="relative py-14 text-gray-100">
            <div
              className="absolute top-0 left-0 w-full h-full -z-10"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80')",
                backgroundPosition:
                  "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8 z-20">
              <HiBadgeCheck className="h-16 w-16 hover:scale-105 transition-all duration-300 ease-in-out text-gray-100" />
              <p className="px-6 py-2 text-xl font-light text-center sm:font-light sm:text-3xl md:text-2xl lg:max-w-2xl xl:max-w-4xl text-gray-100  hover:scale-105 transition-all duration-300 ease-in-out">
                Escape to Extraordinary Adventures
                with <br />
                <span className="p-2 font-black">
                  Away Rental
                </span>
              </p>
              <div className="flex justify-center space-x-3 text-center hover:scale-105 transition-all duration-300 ease-in-out">
                <div>
                  <p className="leading-tight">
                    Alex Hunt
                  </p>
                  <p className="text-xs leading-tight text-gray-400">
                    Lead Software Developer
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Filter Types */}
      <div className="mx-3">
        <div className="flex justify-center my-6 overflow-hidden gap-2">
          {options.map((obj, idx) => (
            <Filter
              title={obj.title}
              icon={obj.icon}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className="pt-5 bg-[#fafafa] dark:bg-site-black">
        {filterId && (
          <div className="ml-12 py-3 flex flex-row text-base items-center">
            Property Type{" "}
            <FiArrowRight className="mx-1" />{" "}
            <p className="font-bold">
              {filterId}
            </p>
          </div>
        )}
        {/* Results */}
        {filterId ? (
          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mx-auto gap-y-1 gap-x-1 px-7 max-w-screen-xl dark:bg-site-black">
            {Object.values(spotsArr).map(
              (spot) => (
                <SpotCard
                  spot={spot}
                  key={spot.id}
                />
              )
            )}
          </div>
        ) : (
          <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mx-auto gap-y-1 gap-x-1 px-7 max-w-screen-xl">
            {Object.values(spotsArr)
              .slice(0, 20)
              .map((spot) => (
                <SpotCard
                  spot={spot}
                  key={spot.id}
                />
              ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Filters;
