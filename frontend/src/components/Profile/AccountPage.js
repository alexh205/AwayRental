import React from 'react';
import Header from '../Header_footer/Header';
import {Link, Redirect, useParams} from 'react-router-dom';

const AccountPage = () =>
  // {user}
  {
    //   if (!user) {
    //     return <Redirect to="/" />;
    //   }

    let {subPage} = useParams();
    if (!subPage) {
      subPage = 'profile';
    }

    const linkClasses = (type = null) => {
      let classes = 'py-2 px-6';
      if (type === subPage) {
        classes += ' bg-site-primary text-white rounded-full';
      }
      return classes;
    };
    return (
      <div>
        <Header />
        <nav className="w-full flex justify-center my-8 gap-2">
          <Link className={linkClasses('profile')} to={'/account'}>
            My profile
          </Link>
          <Link className={linkClasses('bookings')} to={'/account/bookings'}>
            My bookings
          </Link>
          <Link className={linkClasses('spots')} to={'/account/spots'}>
            My accommodations
          </Link>
        </nav>
        {subPage === 'profile' && (
          <div className="text-center max-w-lg mx-auto">
            Logged in as
            {/* {user.name} ({user.email}) */}
            <br />
            <button className="primary max-w-sm mt-2">Logout</button>
          </div>
        )}
      </div>
    );
  };

export default AccountPage;
