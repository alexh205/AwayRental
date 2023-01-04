import React from "react";

const Filter = ({ title, icon }) => {
    return (
        <div className="flex flex-col items-center opacity-60 hover:opacity-100 hover:bg-gray-200 hover:font-bold duration-200 ease-out px-1 cursor-pointer mx-3">
            <div className="text-[28px] mb-1">{icon}</div>
            <div className="text-[14px] opacity-50">{title}</div>
        </div>
    );
};

export default Filter;
