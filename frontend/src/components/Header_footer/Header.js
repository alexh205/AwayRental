import {FiSearch} from 'react-icons/fi';
import {GrUserManager} from 'react-icons/gr';
import {GlobeAltIcon, MenuIcon} from '@heroicons/react/solid';
import React, {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// import { DateRangePicker } from "react-date-range";
import {useHistory} from 'react-router-dom';
import awayRental from '../../images/awayRental.png';

// TODO implement DemoUser
// import DemoUser from "./Profile/DemoUser";

const Header = () => {
  const history = useHistory();

  return (
    <div className="border-b sticky top-0 z-50 bg-[#f7f7f7] mx-6">
      <div className="flex justify-between items-center  ">
        {/* Left */}
        <div className="flex h-20">
          <div
            className="flex overflow-hidden"
            onClick={() => history.push('/')}>
            <img
              src={awayRental}
              alt="logo"
              className="cursor-pointer object-contain -my-1 "
            />
          </div>
        </div>
        {/* Middle */}

        <div className="hidden lg:flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          <div>Anywhere</div>
          <div className="border-l border-gray-300" />
          <div>Any week</div>
          <div className="border-l border-gray-300" />
          <div className="text-gray-400">Add guests</div>
          <button className="bg-site-primary text-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        {/* Right */}
        <div className="flex items-center font-semibold text-gray-600">
          <div  onClick={() => history.push('/account')} className="flex items-center border px-3 py-[11px] rounded-full gap-2 bg-site-primary text-white font-bold shadow-lg shadow-gray-300 hover:bg-site-secondary duration-100 ease-out cursor-pointer">
            <p className="text-[14px]">Sign in</p>
            <MenuIcon className="h-5" />
            <GrUserManager className="text-[20px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
