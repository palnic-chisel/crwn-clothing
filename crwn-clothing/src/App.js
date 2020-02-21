import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import HomePage from "./pages/homepage/HomePage";
import './App.css';
import './pages/homepage/HomePage';
import ShopPage from "./pages/shop/ShopPage";
import CheckoutPage from "./pages/checkout/Checkout";
import Header from "./components/Header/Header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/SignInAndSignUp";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from './redux/user/user-selectors'

import {checkUserSession} from "./redux/user/user-action";


const App = ({checkUserSession, currentUser}) => {
    useEffect(() => {
        checkUserSession()
    }, [checkUserSession]);


    return (
        <div>
            <Header/>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/shop' component={ShopPage}/>
                <Route exact path='/checkout' component={CheckoutPage}/>
                <Route
                    exact
                    path='/signin'
                    render={() =>
                        currentUser ? (
                            <Redirect to='/'/>
                        ) : (
                            <SignInAndSignUpPage/>
                        )
                    }
                />
            </Switch>
        </div>
    );

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    checkUserSession: () => dispatch(checkUserSession())
});


export default connect(
    mapStateToProps, mapDispatchToProps
)(App);

