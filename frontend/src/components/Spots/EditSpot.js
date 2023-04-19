import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editSpotThunk, getSpotByIdThunk, addSpotImagesThunk } from '../../store/spots';
import propertyTypes from '../../static/propertyTypes.json';
import usaStates from '../../static/usaStates.json';
import Amenities from '../Profile/Amenities';
import PhotoUpload from '../Images/PhotoUpload';
import Header from '../Header_footer/Header';

const EditSpot = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [spot, setSpot] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [bedroom, setBedroom] = useState(0);
  const [bed, setBed] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [price, setPrice] = useState(0);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [valid, setValid] = useState(false);
  const [validateErrors, setValidateErrors] = useState([]);



  useEffect(() => {
    dispatch(getSpotByIdThunk(id)).then(res => setSpot(res));
  }, [dispatch]);

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

  const validate = () => {
    const errors = [];
    if (!title) errors.push("Please provide a 'Title'");
    if (title.length > 250 || title.length < 6) {
      if (title.length > 250) {
        errors.push("Description can't be longer than 250 characters");
      }
      if (title.length < 3) {
        errors.push('Description must be at least 3 characters long');
      }
    }
    if (!address) errors.push("Please provide an 'Address'");
    if (!city) errors.push("Please provide a 'City'");
    if (!state) errors.push("Please provide a 'State'");
    if (!country) errors.push("Please provide a 'Country'");
    if (!type) errors.push("Please provide a 'Type'");
    if (!description) errors.push("Please provide a 'Description'");
    if (description.length > 1000 || description.length < 6) {
      if (description.length > 1000) {
        errors.push("Description can't be longer than 1000 characters");
      }
      if (description.length < 6) {
        errors.push('Description must be at least 6 characters long');
      }
    }
    if (amenities.length < 1) errors.push("Please provide the 'Amenities'");
    if (!checkIn) errors.push("Please provide a 'Start Date'");
    if (!checkOut) errors.push("Please provide an 'End Date'");
    if (maxGuests < 1) errors.push("Please provide a 'Max Guests'");
    if (bedroom < 1) errors.push("Please provide a 'Bedroom'");
    if (bed < 1) errors.push("Please provide a 'Bed'");
    if (bathroom < 1) errors.push("Please provide a 'Bathroom'");
    if (price < 1) errors.push("Please provide a 'Price'");

    return errors;
  };

  if (spot) {
    if (!valid) {
      setTitle(spot.title);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setCountry(spot.country);
      setType(spot.type);
      setDescription(spot.description);
      setAmenities(spot.amenities);
      setCheckIn(spot.checkIn);
      setCheckOut(spot.checkOut);
      setMaxGuests(spot.maxGuests);
      setBedroom(spot.bedroom);
      setBed(spot.bed);
      setBathroom(spot.bathroom);
      setPrice(spot.price);
      setAddedPhotos(spot.spotImages.map(({ url }) => url));
      setValid(true);
    }
  }

  const saveSpot = async e => {
    e.preventDefault();

    const errors = validate();

    if (errors.length > 0) {
      return setValidateErrors(errors);
    }

    const spot = {
      id: Number(id),
      address,
      city,
      state,
      country,
      description,
      type,
      title,
      amenities,
      bedroom,
      bed,
      bathroom,
      maxGuests,
      checkIn,
      checkOut,
      price,
    };
    const editSpot = await dispatch(editSpotThunk(spot));

    await dispatch(addSpotImagesThunk(addedPhotos, editSpot.id));
    setTitle('');
    setAddress('');
    setCity('');
    setState('');
    setCountry('');
    setType('');
    setDescription('');
    setAmenities([]);
    setCheckIn('');
    setCheckOut('');
    setMaxGuests(0);
    setBedroom(0);
    setBed(0);
    setBathroom(0);
    setPrice(0);
    setAddedPhotos([]);
    setValidateErrors([]);
    history.push(`/spots/${editSpot.id}`);
  };
  const handleCancel = e => {
    e.preventDefault();
    history.push('/account/spots');
  };

  return (
    <>
      <Header />
      <div className="mx-14 my-6 h-screen">
        <div>
          <h2 className="md:text-4xl text-2xl font-semibold flex flex-row justify-center items-center border-b pb-1">
            Edit <p className="text-site-primary ml-2">{spot.title}</p>
          </h2>
          <form>
            <div className="flex sm:flex-row flex-col items-center w-full gap-4">
              <div className="flex flex-col justify-center w-full">
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
              </div>
              <div className="flex flex-col justify-center w-full">
                {preInput('Property type', 'Select the type of property')}
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
                  className="border rounded-2xl py-2 pl-2"
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
                {preInput('Country', '')}
                <input
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  type="text"
                  placeholder="Country"
                />
              </div>
            </div>

            {preInput(
              'Photos',
              'Provide a well rounded presentation of the property'
            )}
            <PhotoUpload addedPhotos={addedPhotos} onChange={setAddedPhotos} />
            {preInput(
              'Description',
              'Description of the property, what makes it special'
            )}
            <textarea
              value={description}
              rows="12"
              maxLength="1200"
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
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4 mb-3">
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
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-center w-full ">
                <h3 className="mt-2 -mb-1 font-bold text-[17px]">
                  Max # of guests
                </h3>
                <input
                  className="w-full h-full my-1 rounded-2xl text-center border outline-none"
                  type="number"
                  value={maxGuests}
                  onChange={e => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            {validateErrors.length > 0 && (
              <div className="my-2 ml-2">
                <div className="text-red-600 text-[13px] font-semibold  grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                  {validateErrors.map((error, i) => (
                    <div key={i}>{error}</div>
                  ))}
                </div>
              </div>
            )}
            <div className="mx-28 mb-7 flex sm:flex-row flex-col gap-2 items-center">
              <button onClick={saveSpot} className="primary my-2 text-lg">
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 py-[9px] w-full rounded-2xl text-lg text-white my-2">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSpot;
