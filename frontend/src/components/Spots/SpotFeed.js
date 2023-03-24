import React from 'react';
import SpotCard from './SpotCard';

const SpotFeed = ({spots}) => {
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-y-1 gap-x-1 px-7">
      {Object.values(spots)
        .slice(0, 6)
        .map(spot => (
          <SpotCard spot={spot} key={spot.id} />
        ))}
      {Object.values(spots)
        .slice(7, 12)
        .map(spot => (
          <SpotCard spot={spot} key={spot.id} />
        ))}
      {Object.values(spots)
        .slice(13, 20)
        .map(spot => (
          <SpotCard spot={spot} key={spot.id} />
        ))}
    </div>
  );
};

export default SpotFeed;
