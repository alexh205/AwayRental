import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {FaUmbrellaBeach} from 'react-icons/fa';
import {BsHouseFill} from 'react-icons/bs';
import {
  GiFishingBoat,
  GiTreehouse,
  GiWoodCabin,
  GiIsland,
  GiFarmTractor,
} from 'react-icons/gi';
import {MdApartment, MdOutlineBedroomParent} from 'react-icons/md';
import {TbBuildingCottage} from 'react-icons/tb';
import {AiOutlineClear} from 'react-icons/ai';
import Filter from './Filter';
import Header from '../Header_footer/Header';
import {getAllSpotsThunk} from '../../store/spots';
import {useDispatch, useSelector} from 'react-redux';
import SpotCard from '../Spots/SpotCard';
import Footer from '../Header_footer/Footer';
import {FiArrowRight} from 'react-icons/fi';

const Filters = () => {
  const {filterId} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (filterId)
      dispatch(getAllSpotsThunk({type: `${filterId}`, page: 1, size: 20}));
  }, [filterId]);

  useEffect(() => {
    if (!filterId) dispatch(getAllSpotsThunk({page: 1, size: 20}));
  }, []);

  const spotsArr = useSelector(state => state.spots.spots);

  const options = [
    {title: 'House', icon: <BsHouseFill />},
    {title: 'Apartment', icon: <MdApartment />},
    {title: 'Cabin', icon: <GiWoodCabin />},
    {title: 'Lakefront', icon: <FaUmbrellaBeach />},
    {title: 'Treehouse', icon: <GiTreehouse />},
    {title: 'Houseboat', icon: <GiFishingBoat />},
    {title: 'Room', icon: <MdOutlineBedroomParent />},
    {title: 'Cottage', icon: <TbBuildingCottage />},
    {title: 'Farm', icon: <GiFarmTractor />},
    {title: 'Island', icon: <GiIsland />},
    {title: 'Reset', icon: <AiOutlineClear />},
  ];

  return (
    <div className="mb-14">
      <Header />
      <div className="sm:mx-6 md:mx-10 lg:mx-10">
        <div className="flex justify-center my-5 overflow-hidden">
          {options.map((obj, idx) => (
            <Filter title={obj.title} icon={obj.icon} key={idx} />
          ))}
        </div>
      </div>
      {filterId && (
        <div className="ml-12 mb-2 flex flex-row text-lg items-center">
          Property <FiArrowRight className="mx-1" />{' '}
          <p className="font-bold">{filterId}</p>
        </div>
      )}
      {filterId ? (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-y-1 gap-x-1 px-7">
          {Object.values(spotsArr).map(spot => (
            <SpotCard spot={spot} key={spot.id} />
          ))}
        </div>
      ) : (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mx-auto gap-y-1 gap-x-1 px-7">
          {Object.values(spotsArr)
            .slice(0, 20)
            .map(spot => (
              <SpotCard spot={spot} key={spot.id} />
            ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Filters;
