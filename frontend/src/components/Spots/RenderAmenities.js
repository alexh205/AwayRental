import React from 'react';
import {BsCheckCircleFill} from 'react-icons/bs';

const RenderAmenities = ({amenity}) => {
  return (
    <div className='flex flex-row items-center my-2 '>
        <BsCheckCircleFill className='mr-2 w-5 h-5'/>
        <div>{amenity}</div>
    </div>
  )
};

export default RenderAmenities;
