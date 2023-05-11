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
    "hover:font-semibold no-underline cursor-pointer duration-200 ease-out hover:opacity-100 hover:shadow-xl hover:text-slate-800 hover:scale-110 mx-[5px] hover:bg-gray-100 hover:rounded-md p-2";
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
      <div className="text-[28px] mb-1 text-slate-600">
        {icon}
      </div>
      <div className="text-[12px] opacity-50">
        {title}
      </div>
    </div>
  );
};

export default Filter;
