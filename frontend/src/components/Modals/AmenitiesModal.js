import React from 'react';
import {MdClose} from 'react-icons/md';
import {BsCheckCircleFill} from 'react-icons/bs';

const AmenitiesModal = ({showModal, amenities, modal}) => {
  return (
    <div>
      {modal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative w-full max-w-lg p-8 border-solid border-4 border-site-primary bg-white rounded-xl shadow-lg">
              <button
                className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-500"
                onClick={() => showModal(false)}>
                <span className="sr-only">Close Modal</span>
                <MdClose className="w-8 h-8 text-lg mt-1 mr-1" />
              </button>
              <h2 className="mb-4 text-2xl font-bold whitespace-nowrap border-b-2 pb-2 text-center">
                In this property, you will find...
              </h2>
              {amenities?.map((amenity, ind) => (
                <div key={ind} className="flex flex-row items-center my-5">
                  <BsCheckCircleFill className="mr-2 w-5 h-5" />
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenitiesModal;
