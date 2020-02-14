import React from 'react';
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


class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const {checkUserSession}=this.props;
        checkUserSession();

        /*this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });*/
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
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
                            this.props.currentUser ? (
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

