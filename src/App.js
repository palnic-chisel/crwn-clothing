import React from 'react';
import './App.css';
import './pages/homepage/HomePage';
import HomePage from "./pages/homepage/HomePage";
import {Route, Switch} from 'react-router-dom';
import ShopPage from "./pages/shop/ShopPage";

const HatsPage = () => (
    <div>
        <h1>hats page</h1>
    </div>
);

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
            </Switch>
        </div>
    );
}

export default App;

