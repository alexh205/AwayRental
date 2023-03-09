import React from 'react';
import Rental from './Rental';

const RentalFeed = ({ spots, user }) => {
    return (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mx-auto gap-y-3 gap-x-5 px-7">
            {Object.values(spots)
                .slice(0, 6)
                .map(rental => (
                    <Rental spot={rental} user={user} key={rental.id} />
                ))}
            {Object.values(spots)
                .slice(7, 12)
                .map(rental => (
                    <Rental spot={rental} user={user} key={rental.id} />
                ))}
            {Object.values(spots)
                .slice(13, 20)
                .map(rental => (
                    <Rental spot={rental} user={user} key={rental.id} />
                ))}
        </div>
    );
};

export default RentalFeed;
