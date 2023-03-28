import React from 'react';
import {BsCarFront, BsDoorOpen, BsWifi} from 'react-icons/bs';
import {FaFan, FaFireExtinguisher, FaHotTub} from 'react-icons/fa';
import {
  MdPets,
  MdOutlineMicrowave,
  MdOutlineKitchen,
  MdOutlineTableBar,
  MdCoffeeMaker,
  MdOutlineBathtub,
  MdOutlineWater,
  MdOutlineRadio,
  MdMonitor,
} from 'react-icons/md';
import {
  GiChickenOven,
  GiHomeGarage,
  GiCookingPot,
  GiRingingAlarm,
  GiFurnace,
} from 'react-icons/gi';
import {VscDeviceCameraVideo} from 'react-icons/vsc';
import {TbPlant, TbAirConditioning} from 'react-icons/tb';

const Amenities = ({selected, onChange}) => {
  const handleClick = e => {
    const {name, checked} = e.target;
    if (checked && !selected.includes(name)) {
      onChange([...selected, name]);
    } else if (!checked && selected.includes(name)) {
      onChange([...selected.filter(selectedName => selectedName !== name)]);
    }
  };

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Wifi" onChange={handleClick} />
        <BsWifi className="h-6 w-6" />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Radio" onChange={handleClick} />
        <MdOutlineRadio className="h-6 w-6" />
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Private entrance" onChange={handleClick} />
        <BsDoorOpen className="w-6 h-6" />
        <span>Private entrance</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="Security on property"
          onChange={handleClick}
        />
        <VscDeviceCameraVideo className="w-6 h-6" />
        <span>Security on property</span>
      </label>

      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Street parking" onChange={handleClick} />
        <BsCarFront className="w-6 h-6" />
        <span>Street parking</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="Parking on premise"
          onChange={handleClick}
        />
        <GiHomeGarage className="w-6 h-6" />
        <span>Parking on premise</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Water front" onChange={handleClick} />
        <MdOutlineWater className="w-6 h-6" />
        <span>Water front</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Grand view" onChange={handleClick} />
        <TbPlant className="w-6 h-6" />
        <span>Garden view</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Tv" onChange={handleClick} />
        <MdMonitor className="w-6 h-6" />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Pets" onChange={handleClick} />
        <MdPets className="w-6 h-6" />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Hot water" onChange={handleClick} />
        <FaHotTub className="w-5 h-5" />
        <span>Hot water</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Hair dryer" onChange={handleClick} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="w-6 h-6">
          <path
            fill="currentColor"
            d="M22 9a4.32 4.32 0 0 1-2.22-.55A3.4 3.4 0 0 0 18 8V7a4.32 4.32 0 0 1 2.22.55A3.4 3.4 0 0 0 22 8m0-2a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 5v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 7m0 3a3.4 3.4 0 0 1-1.78-.45A4.32 4.32 0 0 0 18 9v1a3.4 3.4 0 0 1 1.78.45A4.32 4.32 0 0 0 22 11m-12 1.73A70.39 70.39 0 0 0 17 11V4s-6.5-2-9.5-2a5.5 5.5 0 0 0-1.38 10.82L7 19h1a3 3 0 0 0 1.46 2.33A3.15 3.15 0 0 1 11 24h1a4.12 4.12 0 0 0-1.91-3.45C9.39 20 9 19.63 9 19h1m-2.5-9A2.5 2.5 0 1 1 10 7.5A2.5 2.5 0 0 1 7.5 10Z"
          />
        </svg>
        <span>Hair dryer</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Heating" onChange={handleClick} />
        <GiFurnace className="w-6 h-6" />
        <span>Heating</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Ac" onChange={handleClick} />
        <TbAirConditioning className="h-6 w-6" />
        <span>AC</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Fan" onChange={handleClick} />
        <FaFan className="h-5 w-5" />
        <span>Fan</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Smoke alarm" onChange={handleClick} />
        <GiRingingAlarm className="h-5 w-5" />
        <span>Smoke alarm</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="Fire extinguisher"
          onChange={handleClick}
        />
        <FaFireExtinguisher className="h-5 w-5" />
        <span>Fire extinguisher</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Kitchen" onChange={handleClick} />
        <GiChickenOven className="h-5 w-5" />
        <span>Kitchen</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Microwave" onChange={handleClick} />
        <MdOutlineMicrowave className="h-5 w-5" />
        <span>Microwave</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Oven" onChange={handleClick} />
        <GiCookingPot className="h-5 w-5" />
        <span>Oven</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Refrigerator" onChange={handleClick} />
        <MdOutlineKitchen className="h-5 w-5" />
        <span>Refrigerator</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type="checkbox"
          name="Bathtub or shower"
          onChange={handleClick}
        />
        <MdOutlineBathtub className="h-5 w-5" />
        <span>Bathtub or shower</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Dining table" onChange={handleClick} />
        <MdOutlineTableBar className="h-5 w-5" />
        <span>Dining table</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input type="checkbox" name="Coffee maker" onChange={handleClick} />
        <MdCoffeeMaker className="h-5 w-5" />
        <span>Coffee maker</span>
      </label>
    </>
  );
};

export default Amenities;
