import React, {useEffect, lazy, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {GlobalStyle} from "./global.styles";

import Header from "./components/Header/Header";
import Spinner from "./components/Spinner/Spinner";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

import {selectCurrentUser} from './redux/user/user-selectors'
import {createStructuredSelector} from "reselect";
import {checkUserSession} from "./redux/user/user-action";


const HomePage = lazy(() => import('./pages/homepage/HomePage'));
const ShopPage = lazy(() => import('./pages/shop/ShopPage'));
const CheckoutPage = lazy(() => import('./pages/checkout/Checkout'));
const SignInAndSignUpPage = lazy(() => import('./pages/sign-in-and-sign-up/SignInAndSignUp'));

const App = ({checkUserSession, currentUser}) => {
    useEffect(() => {
        checkUserSession()
    }, [checkUserSession]);


    return (
        <div>
            <GlobalStyle/>
            <Header/>
            <ErrorBoundary>
                <Switch>
                    <Suspense fallback={<Spinner/>}>
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
                    </Suspense>
                </Switch>
            </ErrorBoundary>
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

