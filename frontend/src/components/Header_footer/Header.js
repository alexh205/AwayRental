import {
    SearchIcon,
    GlobeAltIcon,
    MenuIcon,
    UserCircleIcon,
    UsersIcon,
} from "@heroicons/react/solid";
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

    const handleSelect = (ranges) => {
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
        <header className="sticky top-0 z-50 p-6 grid grid-cols-3 bg-white shadow-md lg:px-20 md:px-12">
            {/* Left Header */}
            <div className="relative flex items-center ">
                <a className="relative flex items-center h-12 pt-3 pl-14 cursor-pointer">
                    <img
                        src="https://cdn2.hubspot.net/hubfs/325665/Images/airbnb-logo.png"
                        alt="airbnb_logo"
                        onClick={() => history.push("/")}
                        style={{
                            objectPosition: "left",
                            objectFit: "contain",
                            minHeight: "200%",
                            maxHeight: "300%",
                        }}
                    ></img>
                </a>
            </div>
            {/* middle Header */}
            <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm text-sm text-gray-600 placeholder-gray-400">
                <input
                    className="flex-grow pl-5 bg-transparent outline-none"
                    type="text"
                    placeholder={"Start your search"}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <SearchIcon className="h-8 hidden md:inline-flex md:mx-2  bg-rose-600 text-white rounded-full cursor-pointer p-2" />
            </div>
            {/* Right Header */}
            <div className="flex space-x-4 items-center justify-end pr-12">
                <p className="hidden md:inline cursor-pointer">
                    Airbnb your home
                </p>
                <GlobeAltIcon className="h-6" />
                <div className="flex border-2 rounded-full p-2 space-x-2 cursor-pointer">
                    <MenuIcon className="h-6 " />
                    <UserCircleIcon className="h-6 " />
                </div>
            </div>
            {searchInput && (
                <div className="flex flex-col col-span-3 mx-auto">
                    <DateRangePicker
                        ranges={[selectionRange]}
                        minDate={new Date()}
                        rangeColors={["#FD5B61"]}
                        onChange={handleSelect}
                    />
                    <div className="flex items-center border-b mb-4">
                        <h2 className="text-2xl flex-grow font-semibold">
                            Number of Guests
                        </h2>
                        <UsersIcon className="h-5" />
                        <input
                            value={guestsNum}
                            onChange={(e) => setGuestsNum(e.target.value)}
                            min={1}
                            type="number"
                            className="w-12 pl-2 text-lg outline-none text-rose-600"
                        />
                    </div>
                    <div className="flex">
                        <button
                            className="flex-grow text-gray-500"
                            onClick={resetInput}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                search();
                                resetInput();
                            }}
                            className="flex-grow text-rose-600"
                        >
                            Search
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
