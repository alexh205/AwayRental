import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import React, {useEffect} from 'react';
import LoginPage from './components/Profile/LoginPage';
import RegisterPage from './components/Profile/RegisterPage';
import AccountNav from './components/Profile/AccountNav';
import SpotPage from './components/Spots/SpotPage';
import Bookings from './components/Booking/Bookings';
import BookingPage from './components/Booking/BookingPage';
import {useSelector, useDispatch} from 'react-redux';
import {restoreUser} from './store/session';

const App = () => {
  const user = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route
            path="/account/:subPage/:action"
            exact={true}
            component={AccountNav}
          />
          <Route exact path="/account/:subPage?" component={AccountNav} />
          <Route path="/spots/:id" component={SpotPage} />
          <Route path="/account/bookings" component={Bookings} />
          <Route path="/bookings/:id" component={BookingPage} />
        </Switch>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
