import React from "react";
import {Link} from 'react-router-dom';
import {auth} from "../../firebase/FirebaseUtils";
import {connect} from 'react-redux'

import {ReactComponent as Logo} from "../../assets/crown.svg";

import './HeaderStyle.scss'
import CartIcon from "../CartIcon/CartIcon";
import CartDropdown from "../CartDropdown/CartDropdown";

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/shop'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={() => auth.signOut()}>
                        SIGN OUT
                    </div>
                    :
                    <Link className='option' to='/signin'>
                        SIGN IN
                    </Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ?
                null
                :
                <CartDropdown/>
        }
    </div>
);

//Funzione che ci permette di accedere allo state del rootReducer. Il parametro state è il rootReducer. state.user è lo userReducer
const mapStateToProps = ({user: {currentUser}, cart: {hidden}}) => ({
    currentUser,
    hidden
});

export default connect(mapStateToProps)(Header);