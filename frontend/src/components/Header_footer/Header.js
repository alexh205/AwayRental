import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import awayRental from "../../static/away_v1.png";
import awayRentalDark from "../../static/away_dark.png";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BsFillPeopleFill } from "react-icons/bs";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import ThemeToggler from "./ThemeToggler";
import { useTheme } from "next-themes";

const Header = ({ placeholder }) => {
  const history = useHistory();
  const user = useSelector(
    (state) => state.session.user?.user
  );

  const [searchInput, setSearchInput] =
    useState("");
  const [startDate, setStartDate] = useState(
    new Date()
  );
  const [endDate, setEndDate] = useState(
    new Date()
  );
  const [guestsNum, setGuestsNum] = useState(1);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    // Convert JavaScript Date objects to ISO string format
    const startDateString =
      startDate.toISOString();
    const endDateString = endDate.toISOString();

    // Redirect to the search page with query parameters
    window.location.href = `/search?city=${searchInput}&startDate=${startDateString}&endDate=${endDateString}&guestsNum=${guestsNum}`;
  };

  // Dark Mode
  // Determine whether dark mode is enabled
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const imageSource = isDarkMode
    ? awayRentalDark
    : awayRental;

  return (
    <header className="grid grid-cols-3 shadow-md p-5 md:px-10 top-0 z-20 bg-site-light dark:bg-site-bblue sticky">
      {/* Left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <div
          className="flex overflow-hidden"
          onClick={() => history.push("/")}
        >
          <img
            src={imageSource}
            alt="logo"
            className="object-contain object-left h-[80px] w-[160px]"
          />
        </div>
      </div>

      {/* Middle */}
      <div className="flex items-center border rounded-full md:shadow-sm md:mx-6 mx-2 dark:border-site-midblue">
        <input
          type="text"
          className="bg-transparent flex-grow sm:border-none ml-2 outline-none py-2 text-sm text-gray-600 placeholder:text-sm placeholder-gray-400"
          placeholder={
            placeholder || "Search by city"
          }
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
        />
        <div className="hidden sm:inline-flex bg-site-primary dark:bg-site-midblue rounded-full p-1 sm:mx-2">
          <RxMagnifyingGlass className=" w-5 h-5 text-white" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-3 justify-between">
        <section className="static top-5 object-center">
          <ThemeToggler />
        </section>
        <div
          onClick={() =>
            history.push(
              !user ? "/login" : "/account"
            )
          }
          className="flex items-center px-6 py-2 rounded-full bg-site-primary text-sm text-white font-semibold shadow-lg shadow-gray-300 hover:bg-site-secondary duration-100 ease-out cursor-pointer dark:shadow-md dark:bg-site-midblue dark:hover:bg-site-ablue"
        >
          {!user ? (
            <p className="text-sm">Sign in</p>
          ) : (
            <p className="text-sm">{user.name}</p>
          )}

          {/* <GrUserManager className="text-[20px]" /> */}
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
            <BsFillPeopleFill className="h-5 w-8" />
            <input
              value={guestsNum}
              onChange={(e) =>
                setGuestsNum(e.target.value)
              }
              min={1}
              max={30}
              type="number"
              className="text-lg outline-none text-site-primary"
              style={{
                maxWidth: "4.3rem",
                textAlign: "center",
              }}
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500 font-semibold"
              onClick={resetInput}
            >
              Cancel
            </button>
            <button
              className="flex-grow text-site-primary font-semibold"
              onClick={search}
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
