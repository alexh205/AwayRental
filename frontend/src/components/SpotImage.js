import React, {useState} from 'react';
import {CgMenuGridO} from 'react-icons/cg';

const SpotImage = ({spot, setSelectImage}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {spot.title}</h2>
            <button
              onClick={() => {
                setShowAllPhotos(false);
                setSelectImage(false);
              }}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {spot.spotImages?.length > 0 &&
            spot.spotImages.map(photo => (
              <div>
                <img src={photo.url} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (spot)
    return (
      <div className="relative">
        <div className="grid gap-2 grid-cols-3 rounded-3xl overflow-hidden">
          <div className="col-span-2">
            {spot.spotImages[0] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer w-full object-cover"
                src={spot.spotImages[0].url}
              />
            )}
          </div>

          <div className="grid">
            {spot.spotImages[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square cursor-pointer object-cover"
                src={spot.spotImages[1].url}
              />
            )}
            <div className="overflow-hidden">
              {spot.spotImages[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square cursor-pointer object-cover relative"
                  src={spot.spotImages[2].url}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setShowAllPhotos(true);
            setSelectImage(true);
          }}
          className="absolute flex flex-row items-center whitespace-nowrap bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 ">
          <CgMenuGridO className="mr-1" />
          Show all photos
        </button>
      </div>
    );
};

export default SpotImage;
