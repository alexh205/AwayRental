import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userSpotsById} from '../../store/spots';
import SpotImage from '../Images/SpotImage';

const UserSpots = ({setSelected}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user?.user);
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    dispatch(userSpotsById(user.id)).then(res => setSpots(res));
  }, []);

  return (
    <div>
      <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-site-primary text-white py-2 px-6 rounded-full"
          onClick={() => {
            setSelected(true);
          }}
          to={'/account/spots/new'}>
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add a new spot
        </Link>
      </div>
      <div className="mt-4 container mx-auto">
        {spots.length > 0 &&
          spots.map((spot, ind) => {
            const {id, title, description} = spot;
            return (
              <Link
                key={ind}
                to={`/account/spots/${id}`}
                className="flex cursor-pointer gap-x-4 gap-y-2 bg-gray-100 p-4 rounded-2xl my-4">
                <div class="flex w-36 sm:w-48 md:w-64 h-36 sm:h-48 md:h-64 grow shrink-0">
                  <img
                    src={spot?.spotImages[0]?.url}
                    alt={title}
                    class="object-cover w-full h-full rounded-2xl"
                  />
                </div>

                <div className="grow-0 shrink">
                  <h2 className="text-2xl font-semibold">{title}</h2>
                  <p className="text-sm mt-2">{description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default UserSpots;
