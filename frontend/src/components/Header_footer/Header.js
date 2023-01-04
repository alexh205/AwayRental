import { FiSearch } from "react-icons/fi";
import { GrUserManager } from "react-icons/gr";
import { GlobeAltIcon, MenuIcon } from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useHistory } from "react-router-dom";

// TODO implement DemoUser
// import DemoUser from "./Profile/DemoUser";

const Header = () => {
    const [searchInput, setSearchInput] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [guestsNum, setGuestsNum] = useState(1);
    const history = useHistory();

    const handleSelect = ranges => {
        setStartDate(ranges.Selection.startDate);
        setEndDate(ranges.Selection.endDate);
    };

    const resetInput = () => {
        setSearchInput("");
    };
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "Selection",
    };

    const search = () => {
        history.push({
            pathname: "/search",
            query: {
                address: searchInput,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                guestsNum,
            },
        });
    };

    return (
        <div className="border-b sticky top-0 z-50 bg-white/[95%] px-[36px] ">
            <div className="flex justify-between items-center sm:mx-7 md:mx-11 lg:mx-13 ">
                {/* Left */}
                <div className="flex h-20">
                    <a className="flex overflow-hidden ">
                        <img
                            src="https://cdn2.hubspot.net/hubfs/325665/Images/airbnb-logo.png"
                            className="cursor-pointer object-cover -my-7 "
                            onClick={() => history.push("/")}
                        />
                    </a>
                </div>
                {/* Middle */}
                <div className="hidden lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full ">
                    <input
                        type="search"
                        placeholder=""
                        className="py-2.5 w-[20rem] rounded-full outline-0"
                    />
                    <div className="flex justify-between absolute w-full pr-16 pl-6 font-semibold text-gray-600">
                        <button className="w-full text-[14px]">Anywhere</button>
                        <button className="border-l border-x px-7 text-[14px]">
                            Any week
                        </button>
                        <button className="w-full text-gray-500/60 pl-2 text-[14px]">
                            Add guests
                        </button>
                    </div>
                    <div className="bg-[#ff5a60] p-2 rounded-full mr-2">
                        <FiSearch className="text-white w-full" />
                    </div>
                </div>
                {/* Right */}
                <div className="flex items-center font-semibold text-gray-600">
                    <p className="text-[12px] cursor-pointer">
                        Host Your Property
                    </p>
                    <div className="flex items-center mx-4 gap-1">
                        <GlobeAltIcon className="h-5" />
                    </div>

                    <div className="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#ff5a60] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#f9787c] duration-100 ease-out cursor-pointer">
                        {/* <p className="text-[14px]">Sign in</p> */}
                        <MenuIcon className="h-5"/>
                        <GrUserManager className="text-[20px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
