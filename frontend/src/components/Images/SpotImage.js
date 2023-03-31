import React, {useState} from 'react';
import {BsImage} from 'react-icons/bs';

const SpotImage = ({spot, setSelectImage}) => {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4 ">
          <div>
            <h2 className="sm:text-3xl text-xl text-center">
              Photos of {spot.title}
            </h2>
            <button
              onClick={() => {
                setShowAllPhotos(false);
                setSelectImage(false);
              }}
              className="fixed right-8 top-7 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
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
            spot.spotImages.map((photo, ind) => (
              <div
                key={ind}
                className="flex flex-col items-center justify-center mx-20">
                <img src={photo.url} alt="" className="object-contain" />
              </div>
            ))}
        </div>
      </div>
    );
  }
  if (spot)
    return (
      <>
        {spot.spotImages.length === 1 ? (
          <div className="flex">
            <div className="h-fit flex items-center justify-center mx-auto">
              <img
                className="h-fit aspect-auto object-contain rounded-3xl"
                src={spot.spotImages[0].url}
              />
            </div>
          </div>
        ) : spot.spotImages.length === 0 ? null : (
          <div className="relative">
            <div className="sm:grid gap-[5px] grid-cols-3 flex rounded-3xl overflow-hidden">
              <div className="col-span-2">
                {spot.spotImages[0] && (
                  <img
                    onClick={() => {
                      setShowAllPhotos(true);
                      setSelectImage(true);
                    }}
                    className="aspect-square cursor-pointer w-full object-cover"
                    src={spot.spotImages[0].url}
                  />
                )}
              </div>

              <div className="grid">
                {spot.spotImages[1] && (
                  <img
                    onClick={() => {
                      setShowAllPhotos(true);
                      setSelectImage(true);
                    }}
                    className="aspect-square cursor-pointer object-cover hidden sm:block"
                    src={spot.spotImages[1].url}
                  />
                )}

                {spot.spotImages[2] && (
                  <img
                    onClick={() => {
                      setShowAllPhotos(true);
                      setSelectImage(true);
                    }}
                    className="aspect-square cursor-pointer object-cover relative hidden sm:block -mb-1"
                    src={spot.spotImages[2].url}
                  />
                )}
              </div>
            </div>
            <button
              onClick={() => {
                setShowAllPhotos(true);
                setSelectImage(true);
              }}
              className={`${
                spot.spotImages.length < 4
                  ? 'hidden'
                  : 'absolute hidden sm:flex flex-row items-center whitespace-nowrap bottom-2 md:right-2 right-1 py-2 md:px-[14px] px-4 bg-white rounded-2xl shadow-md shadow-gray-500 '
              }`}>
              <BsImage className="w-5 h-5 mr-2" />
              Show all photos
            </button>
          </div>
        )}
      </>
    );
};

export default SpotImage;
