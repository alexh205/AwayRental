import React from "react";
import { useHistory } from "react-router-dom";

const Filter = ({
  title,
  icon,
  className = null,
}) => {
  const history = useHistory();
  const mainFilters = [
    "House",
    "Apartment",
    "Cabin",
    "Lakefront",
    "Reset",
  ];

  if (!className && mainFilters.includes(title)) {
    className =
      "flex flex-col items-center justify-center";
  } else {
    className =
      "md:flex hidden flex-col items-center justify-center";
  }
  className +=
    "hover:font-semibold no-underline cursor-pointer duration-100 ease-out hover:shadow-xl text-slate-500 hover:text-slate-800 dark:hover:text-site-lightblue hover:scale-105 mx-[5px] dark:hover:bg-gray-900 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-site-black hover:rounded-md p-2";
  return (
    <div
      className={className}
      onClick={() =>
        history.push(
          `${
            title === "Reset"
              ? "/"
              : `/filters/${title}`
          }`
        )
      }
    >
      <div className="text-[28px] mb-1">
        {icon}
      </div>
      <div className="text-[12px]">{title}</div>
    </div>
  );
};

export default Filter;
