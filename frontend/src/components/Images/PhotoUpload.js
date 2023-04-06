import React, {useState} from 'react';
import {BsTrash} from 'react-icons/bs';

const PhotoUpload = ({addedPhotos, onChange}) => {
  const [photoLink, setPhotoLink] = useState('');

  const addPhotoByLink = async e => {
    e.preventDefault();
    onChange(prev => {
      return [...prev, photoLink];
    });
    setPhotoLink('');
  };

  //   const uploadPhoto = e => {
  //     const files = e.target.files;
  //     const data = new FormData();
  //     for (let i = 0; i < files.length; i++) {
  //       data.append('photos', files[i]);
  //     }
  //   };

  const removePhoto = (e, link) => {
    e.preventDefault();
    onChange([...addedPhotos.filter(photo => photo !== link)]);
  };

  const selectAsMainPhoto = (e, link) => {
    e.preventDefault();
    onChange([link, ...addedPhotos.filter(photo => photo !== link)]);
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={e => setPhotoLink(e.target.value)}
          type="text"
          placeholder={'Add using a link ....jpg'}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl">
          Add&nbsp;photo
        </button>
      </div>
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos?.length > 0 &&
          addedPhotos.map((link, ind) => (
            <div className="h-32 flex relative" key={ind}>
              <img
                className="rounded-2xl w-full object-cover"
                src={link}
                alt="spot"
              />
              <button
                onClick={e => removePhoto(e, link)}
                className="cursor-pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                <BsTrash className="w-6 h-6" />
              </button>
              <button
                onClick={e => selectAsMainPhoto(e, link)}
                className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
                {link === addedPhotos[0] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6">
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {link !== addedPhotos[0] && (
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
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                )}
              </button>
            </div>
          ))}
        {/* <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
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
          Upload
        </label> */}
      </div>
    </>
  );
};

export default PhotoUpload;
