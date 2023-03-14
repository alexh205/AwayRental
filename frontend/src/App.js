import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import RentalDetail from './components/RentalDetail';

const App = () => {
    return (
        <>
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/spots/:spotId" component={RentalDetail} />
                </Switch>
            </main>
        </>
    );
};

export default App;
