import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import RentalDetail from './components/RentalDetail';
import LoginPage from './components/Profile/LoginPage';
import RegisterPage from './components/Profile/RegisterPage';
import Footer from './components/Header_footer/Footer';
import AccountPage from './components/Profile/AccountPage';

const App = () => {
  return (
    <>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/spots/:spotId" component={RentalDetail} />
          <Route
            path="/account/:subPage/:action"
            exact={true}
            component={AccountPage}
          />
          <Route path="/account/:subPage?" component={AccountPage} />
        </Switch>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;
