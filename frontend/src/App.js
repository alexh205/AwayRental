import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import SpotDetail from "./components/SpotDetail";

function App() {
    return (
        <>

            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/spots/:spotId" component={SpotDetail} />
                </Switch>
            </main>

        </>
    );
}

export default App;
