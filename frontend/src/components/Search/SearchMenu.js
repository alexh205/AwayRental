import React from 'react';

const SearchMenu = () => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    // Handle search logic here
    console.log('Search:', location, checkIn, checkOut, guests);
  };
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-5">Find your perfect stay</h1>
      <div className="bg-white shadow-md rounded-md p-5 w-full max-w-md">
        <input
          className="w-full border-gray-300 border-2 rounded-md mb-3 py-2 px-3"
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <div className="flex justify-between mb-3">
          <input
            className="w-1/2 mr-2 border-gray-300 border-2 rounded-md py-2 px-3"
            type="date"
            placeholder="Check-in"
            value={checkIn}
            onChange={e => setCheckIn(e.target.value)}
          />
          <input
            className="w-1/2 ml-2 border-gray-300 border-2 rounded-md py-2 px-3"
            type="date"
            placeholder="Check-out"
            value={checkOut}
            onChange={e => setCheckOut(e.target.value)}
          />
        </div>
        <select
          className="w-full border-gray-300 border-2 rounded-md mb-3 py-2 px-3"
          value={guests}
          onChange={e => setGuests(parseInt(e.target.value))}>
          <option value={1}>1 Guest</option>
          <option value={2}>2 Guests</option>
          <option value={3}>3 Guests</option>
          <option value={4}>4 Guests</option>
        </select>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md w-full"
          onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchMenu;
