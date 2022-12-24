import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import TypeBanner from "./components/TypeBanner";



function App() {
    return (
        <>
            <Header />
            <TypeBanner />
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </main>
            <Footer />
        </>
    );
}

export default App;
