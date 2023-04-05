import React, {useState, useEffect} from 'react';
import Header from '../Header_footer/Header';
import {Link, Redirect, useParams, useHistory} from 'react-router-dom';
import {SpotForm} from '../Spots/SpotForm';
import {useSelector, useDispatch} from 'react-redux';
import {logoutThunk} from '../../store/session';
import Bookings from '../Booking/Bookings';
import UserSpots from '../Spots/UserSpots';
import {GrContactInfo} from 'react-icons/gr';
import {BsHouseDoor} from 'react-icons/bs';
import {SlNotebook} from 'react-icons/sl';
import {userDetailThunk} from '../../store/spots';
import UserProfile from './UserProfile';
// import UserPassword from './UserPassword';

const AccountNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user?.user);
  const [selected, setSelected] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [spots, setSpots] = useState([]);
  const [userProfileInfo, setUserProfileInfo] = useState(false);
  const [userPassword, setUserPassword] = useState(false);

  useEffect(() => {
    setSelected(false);
  }, [dispatch]);

  let {subPage} = useParams();
  if (!subPage) {
    subPage = 'profile';
  }

  useEffect(() => {
    dispatch(userDetailThunk()).then(res => setUserDetails(res));
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/" />;
  }

  const logoutUser = async e => {
    e.preventDefault();
    await dispatch(logoutThunk());
  };

  const linkClasses = (type = null) => {
    let classes =
      'py-2 px-[10px] sm:px-6 inline-flex gap-1 whitespace-nowrap items-center';
    if (type === subPage) {
      classes += ' bg-site-primary text-white rounded-full';
    } else {
      classes += ' bg-gray-200 text-gray-500 rounded-full';
    }
    return classes;
  };
  return (
    <div>
      <Header />
      <nav className="w-full flex justify-center my-8 gap-2">
        <Link className={linkClasses('profile')} to={'/account'}>
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          My profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          My bookings
        </Link>
        <Link className={linkClasses('spots')} to={'/account/spots'}>
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
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My accommodations
        </Link>
      </nav>
      {subPage === 'profile' && (
        <>
          {!userProfileInfo && !userPassword && (
            <div className="text-center max-w-lg mx-auto flex flex-col justify-center items-center">
              <div className="mb-4 flex flex-row items-center text-2xl justify-center">
                Welcome Back <p className="ml-2 font-bold">{user?.name}</p>!
              </div>
              <div className="h-48 w-48 mb-2">
                <img
                  src={user.profileImg}
                  alt="user"
                  className="rounded-3xl object-cover h-full w-full"
                />
              </div>
              {/* <div className="grid md:grid-cols-4 grid-col-2 gap-4 my-2 "> */}
              <div className="grid md:grid-cols-3 grid-cols-2 gap-4 my-2 ">
                <div
                  className="flex flex-col items-start border-2 rounded-xl p-[4px] cursor-pointer hover:shadow-lg"
                  onClick={() => {
                    setUserProfileInfo(true);
                    setUserPassword(false);
                  }}>
                  <GrContactInfo className="w-8 h-8 mx-auto my-2 " />
                  <div className="mx-auto">Personal Info</div>
                  <div className="text-sm text-start opacity-50">
                    Modify user details
                  </div>
                </div>
                {/* <div
                  className="flex flex-col items-start border-2 rounded-xl p-[4px] cursor-pointer hover:shadow-lg"
                  onClick={() => {
                    setUserPassword(true);
                    setUserProfileInfo(false);
                  }}>
                  <IoKeySharp className="w-6 h-6 ml-2 my-2 " />
                  <div>Password</div>
                  <div className="text-sm opacity-50 mb-1 text-start">
                    Update password
                  </div>
                </div> */}
                <div
                  className="border-2 rounded-xl py-2 justify-center items-center my-auto hover:shadow-lg cursor-pointer"
                  onClick={() => history.push('/account/bookings')}>
                  <SlNotebook className="w-7 h-7 mb-2 mx-auto" />
                  <div className="flex flex-col items-start ">
                    <div className="mx-auto">Bookings:</div>
                    <div className="mx-auto ont-semibold text-xl text-site-primary font-bold">
                      {userDetails.bookings?.length}
                    </div>
                  </div>
                </div>
                <div
                  className="border-2 rounded-xl py-2 justify-center items-center my-auto hover:shadow-lg cursor-pointer"
                  onClick={() => history.push('/account/spots')}>
                  <BsHouseDoor className="mx-auto h-7 w-7 mb-2 " />
                  <div className="flex flex-col items-start ">
                    <div className=" mx-auto">Properties:</div>
                    <div className="mx-auto ont-semibold text-xl text-site-primary font-bold">
                      {userDetails.spots?.length}
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="primary max-w-sm mt-4 bg-site-primary hover:bg-site-secondary"
                onClick={logoutUser}>
                Logout
              </button>
            </div>
          )}
          {userProfileInfo && (
            <UserProfile setUserProfileInfo={setUserProfileInfo} user={user} />
          )}
          {/* {userPassword && (
            <UserPassword setUserPassword={setUserPassword} user={user} />
          )} */}
        </>
      )}
      {subPage === 'spots' && (
        <>
          {selected && (
            <SpotForm setSelected={setSelected} setSpots={setSpots} />
          )}
          {!selected && (
            <UserSpots
              selected={selected}
              setSelected={setSelected}
              spots={spots}
              setSpots={setSpots}
            />
          )}
        </>
      )}
      {subPage === 'bookings' && <Bookings />}
    </div>
  );
};

export default AccountNav;
