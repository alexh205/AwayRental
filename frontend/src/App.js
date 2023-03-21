import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import LoginPage from './components/Profile/LoginPage';
import RegisterPage from './components/Profile/RegisterPage';
import AccountPage from './components/Profile/AccountPage';
import SpotPage from './components/SpotPage';
import * as spotActions from './store/spots';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getAllSpots());
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
            component={AccountPage}
          />
          <Route exact path="/account/:subPage?" component={AccountPage} />
          <Route path="/spots/:id" component={SpotPage} />
        </Switch>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
