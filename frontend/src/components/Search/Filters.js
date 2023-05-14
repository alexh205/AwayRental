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
import Fade from "react-reveal/Fade";

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
    <div className="mb-0">
      <Header />
      <div>
        <div className="">
          <section className=" bg-gray-100 text-gray-800">
            <Fade>
              <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
                <HiBadgeCheck className="h-20 w-20 hover:scale-105 transition-all duration-300 ease-in-out" />
                <p className="px-6 py-2 text-xl font-light text-center sm:font-light sm:text-3xl md:text-2xl lg:max-w-2xl xl:max-w-4xl text-gray-700  hover:scale-105 transition-all duration-300 ease-in-out">
                  Escape to Extraordinary
                  Adventures with <br />
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
            </Fade>
          </section>
        </div>
      </div>
      <div className="sm:mx-3 md:mx-5 lg:mx-5">
        <div className="flex justify-center my-8 overflow-hidden gap-2">
          {options.map((obj, idx) => (
            <Filter
              title={obj.title}
              icon={obj.icon}
              key={idx}
            />
          ))}
        </div>
      </div>
      {filterId && (
        <div className="ml-12 py-3 flex flex-row text-base items-center">
          Property Type{" "}
          <FiArrowRight className="mx-1" />{" "}
          <p className="font-bold">{filterId}</p>
        </div>
      )}
      {filterId ? (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 mx-auto gap-y-1 gap-x-1 px-7 max-w-screen-xl">
          {Object.values(spotsArr).map((spot) => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
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
      <Footer />
    </div>
  );
};

export default Filters;
