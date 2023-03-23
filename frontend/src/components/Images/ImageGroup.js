import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';
import {FaHeart} from 'react-icons/fa';
import {useHistory} from 'react-router-dom';

const ImageGroup = ({images, spot}) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/spots/${spot.id}`);
  };
  const handleHeartClick = () => {};
  return (
    <div className="mb-4">
      <Carousel
        className="flex "
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}>
        {images?.map(image => (
          <div key={image.id} className="relative">
            <FaHeart
              className="absolute top-3 right-7 sm:top-[10px] sm:right-[34px] z-40 cursor-pointer opacity-90 text-slate-600 hover:text-red-600 hover:opacity-100 w-5 h-5 sm:w-6 sm:h-6"
              onClick={handleHeartClick}
            />

            <div
              className="cursor-pointer h-80 w-full border-3 border-red-600"
              onClick={handleClick}>
              <img
                loading="lazy"
                src={image.url}
                alt="carousel image"
                className="w-full h-full rounded-xl object-cover opacity-90"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageGroup;
