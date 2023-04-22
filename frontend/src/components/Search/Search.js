import React, { useEffect } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import Header from '../Header_footer/Header';
import Footer from '../Header_footer/Footer';
import { getAllSpotsThunk, setSearch } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import SearchResult from './SearchResult';


const Search = () => {
  const dispatch = useDispatch();

  // Get the current URL
  const url = new URL(window.location.href);

  // Extract query parameters from the URL
  const city = url.searchParams.get('city');
  const startDateString = url.searchParams.get('startDate');
  const endDateString = url.searchParams.get('endDate');
  const guestsNum = url.searchParams.get('guestsNum');

  // Convert startDateString and endDateString to Date objects
  const startDate = format(new Date(startDateString), 'dd MMM yyyy');
  const endDate = format(new Date(endDateString), 'dd MMM yyyy');
  const range = `${startDate} - ${endDate}`;
  const daysTotal = differenceInCalendarDays(
    new Date(endDateString),
    new Date(startDateString)
  );

  const PAGE_SIZE = {
    page: 1,
    size: 10,
  };

  const data = { startDate, endDate, guestsNum }


  useEffect(() => {
    const fetchData = async () => {
      if (url) {
        await dispatch(
          getAllSpotsThunk({
            city: `${city}`,
            numGests: `${guestsNum}`,
            ...PAGE_SIZE,
          })
        );
        await dispatch(setSearch(data))
      }
    };
    fetchData();
  }, []);
  const spots = useSelector(state => state.spots?.spots);

  return (
    <div>
      <Header placeholder={`${city} | ${range} | ${guestsNum} guests`} />
      <main className="flex">
        <section className="flex-grow pt-10 px-6">
          <p>
            {Object.values(spots).length} Stays - {range} - for {guestsNum}{' '}
            Guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {city}</h1>

          <div className="mb-10">
            {spots &&
              Object.values(spots).map(
                ({
                  id,
                  city,
                  state,
                  title,
                  amenities,
                  price,
                  spotImages,
                  avgRating,
                  type,
                  bedroom,
                  bathroom,
                  bed,
                  maxGuests,
                }) => (
                  <SearchResult
                    key={id}
                    id={id}
                    image={spotImages[0].url}
                    title={title}
                    type={type}
                    rating={avgRating}
                    city={city}
                    state={state}
                    amenities={amenities}
                    price={price}
                    bedroom={bedroom}
                    bathroom={bathroom}
                    bed={bed}
                    maxGuests={maxGuests}
                    days={daysTotal}
                  />
                )
              )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
