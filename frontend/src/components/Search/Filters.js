import React from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BsHouseFill } from "react-icons/bs";
import {
    GiFishingBoat,
    GiTreehouse,
    GiWoodCabin,
    GiIsland,
    GiFarmTractor,
} from "react-icons/gi";
import { MdApartment, MdOutlineBedroomParent } from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";
import Filter from "./Filter";

const Filters = () => {
    const options = [
        { title: "House", icon: <BsHouseFill /> },
        { title: "Treehouse", icon: <GiTreehouse /> },
        { title: "Apartment", icon: <MdApartment /> },
        { title: "Cabin", icon: <GiWoodCabin /> },
        { title: "Houseboat", icon: <GiFishingBoat /> },
        { title: "Lakefront", icon: <FaUmbrellaBeach /> },
        { title: "Island", icon: <GiIsland /> },
        { title: "Farm", icon: <GiFarmTractor /> },
        { title: "Cottage", icon: <TbBuildingCottage /> },
        { title: "Room", icon: <MdOutlineBedroomParent /> },
    ];
    return (
        <div className="sm:mx-6 md:mx-10 lg:mx-10">
            <div className="flex justify-center my-5 overflow-hidden">
                {options.map(obj => (
                    <Filter title={obj.title} icon={obj.icon} className=" "/>
                ))}
            </div>
        </div>
    );
};

export default Filters;
