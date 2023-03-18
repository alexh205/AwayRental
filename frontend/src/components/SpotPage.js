import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {BiGridHorizontal} from 'react-icons/bi';
import {AiOutlineLeft} from 'react-icons/ai';

const SpotPage = () => {
  const {id} = useParams();
  const [spot, setSpot] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
  }, []);

  if (!spot) return null;
  if (setShowAllPhotos) {
    return (
      <div className="absolute inset-0 bg-white min-h-screen">
        <div className="p-8 grid gap-4">
          <div>
            <h2 className="text-3xl">Photos of {spot.title}</h2>
            <button className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow-black">
              <AiOutlineLeft />
              Close photos
            </button>
          </div>
          {spot?.photos?.length > 0 &&
            spot.photos.map(photo => (
              <div>
                <img src={photo.url} alt=""></img>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{spot.title}</h1>
      <a
        className="my-2 text-semibold block underline"
        href={'https://maps.google.com/?q=' + spot.address}
        target="_blank">
        {spot.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr]">
          <div>
            <div>
              {spot.photos?.[0] && (
                <img
                  className="aspect-square object-cover"
                  src={spot.photos[0].url}
                />
              )}
            </div>
          </div>

          <div className="grid">
            {spot.photos?.[1] && (
              <img
                className="aspect-square object-cover"
                src={spot.photos[1].url}
              />
            )}
            <div className="overflow-hidden">
              {spot.photos?.[2] && (
                <img
                  className="aspect-square object-cover relative"
                  src={spot.photos[2].url}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 ">
          <BiGridHorizontal />
          Show more photos
        </button>
      </div>
    </div>
  );
};

export default SpotPage;
