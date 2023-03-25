import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Amenities from '../Profile/Amenities';
import usaStates from '../../static/usaStates.json';
import propertyTypes from '../../static/propertyTypes.json';

export const SpotForm = () => {
  const {action} = useParams();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [type, setType] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState('');
  const [description, setDescription] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [bedroom, setBedroom] = useState(1);
  const [bed, setBed] = useState(1);
  const [bathroom, setBathroom] = useState(0);
  const [price, setPrice] = useState(0);

  const inputHeader = text => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = text => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  return (
    <div className="mx-8 h-fit">
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-site-primary text-white py-2 px-6 rounded-full"
            to={'/account/spots/new'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add a new spot
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          <form>
            {preInput(
              'Title',
              'Provide a short heading/title for the property'
            )}
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Title, ex) Friendly cozy house"
            />
            {preInput('Address', 'Address to the property')}
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              type="text"
              placeholder="Address"
            />
            {preInput('City', '')}
            <input
              value={city}
              onChange={e => setCity(e.target.value)}
              type="text"
              placeholder="City"
            />
            <div className="flex flex-row items-center w-full gap-4">
              <div className="flex flex-col justify-center w-full">
                {preInput('State', '')}
                <select
                  className="border rounded-2xl  py-2 text-center"
                  value={state}
                  onChange={e => setState(e.target.value)}>
                  <option value="" disabled>
                    --Please select a State--
                  </option>
                  {usaStates.map((state, idx) => (
                    <option key={idx} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col justify-center w-full">
                {preInput('Property type', '')}
                <select
                  className="border rounded-2xl py-2 text-center"
                  value={type}
                  onChange={e => setType(e.target.value)}>
                  <option value="" disabled>
                    --Please select a Type--
                  </option>
                  {propertyTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {preInput(
              'Photos',
              'Provide a well rounded presentation of the property'
            )}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={e => setPhotoLink(e.target.value)}
                type="text"
                placeholder={'Add a photo url'}
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;photo
              </button>
            </div>
            <div className="mt-2 grid grid-col-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="flex gap-1 justify-center items-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                <p className="text-xl text-gray-500">Upload</p>
              </button>
            </div>
            {preInput(
              'Description',
              'Description of the property, what makes it special'
            )}
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            {preInput(
              'Amenities',
              'Select all amenities available at this spot'
            )}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cold-5">
              <Amenities selected={amenities} onChange={setAmenities} />
            </div>
            <h2 className="text-2xl mt-4">Rooms & beds</h2>
            <p className="text-gray-500 text-sm">
              Bedrooms, bathrooms, beds, etc.
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center w-full">
                <h3 className="mt-2 -mb-1 font-bold text-[17px] text-center">
                  # of Bedrooms
                </h3>
                <input
                  value={bedroom}
                  onChange={e => setBedroom(e.target.value)}
                  type="number"
                  className="w-full h-full my-1 rounded-2xl text-center border outline-none"
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="mt-2 -mb-1 font-bold text-[17px]"># of Beds</h3>
                <input
                  value={bed}
                  onChange={e => setBed(e.target.value)}
                  type="number"
                  className="w-full h-full my-1 rounded-2xl text-center border outline-none"
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="mt-2 -mb-1 font-bold text-[17px] ">
                  # of Bathrooms
                </h3>
                <input
                  className="w-full h-full my-1 rounded-2xl text-center border outline-none"
                  type="number"
                  value={bathroom}
                  onChange={e => setBathroom(e.target.value)}
                />
              </div>
            </div>
            <h2 className="text-2xl mt-4">Check in/out times</h2>
            <p className="text-gray-500 text-sm">
              Add check in and check out times
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div className="flex flex-col items-center">
                <h3 className="mt-2 -mb-1 font-bold text-[17px] text-center">
                  Check in time
                </h3>
                <input
                  value={checkIn}
                  onChange={e => setCheckIn(e.target.value)}
                  type="text"
                  placeholder="13:00"
                  className="text-center"
                />
              </div>
              <div className="flex flex-col items-center">
                <h3 className="mt-2 -mb-1 font-bold text-[17px]">
                  Check out time
                </h3>
                <input
                  value={checkOut}
                  onChange={e => setCheckOut(e.target.value)}
                  type="text"
                  placeholder="11:00"
                  className="text-center"
                />
              </div>
              <div className="flex flex-col items-center w-full">
                <h3 className="mt-2 -mb-1 font-bold text-[17px] ">
                  Price per night
                </h3>
                <input
                  className="w-full h-full my-1 rounded-2xl text-center border outline-none"
                  type="number"
                  value={maxGuests}
                  onChange={e => setMaxGuests(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center w-full ">
                <h3 className="mt-2 -mb-1 font-bold text-[17px]">
                  Max # of guests
                </h3>
                <input
                  className="w-full h-full my-1 rounded-2xl text-center border outline-none"
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className='mx-28'>
              <button className="primary my-[18px]">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SpotForm;
