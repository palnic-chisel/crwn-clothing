import React from "react";
import {connect} from 'react-redux'
import {selectCartHidden} from "../../redux/cart/cart-selectors";
import {selectCurrentUser} from '../../redux/user/user-selectors'

import {signOutStart} from "../../redux/user/user-action";

import {ReactComponent as Logo} from "../../assets/crown.svg";

import './HeaderStyle.scss'
import CartIcon from "../CartIcon/CartIcon";
import CartDropdown from "../CartDropdown/CartDropdown";
import {createStructuredSelector} from "reselect";

import {HeaderContainer, OptionsContainer, LogoContainer, OptionLink} from './HeaderStyle'

const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/shop'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    <OptionLink as='div' onClick={signOutStart}>
                        SIGN OUT
                    </OptionLink>
                    :
                    <OptionLink to='/signin'>
                        SIGN IN
                    </OptionLink>
            }
            <CartIcon/>
        </OptionsContainer>
        {
            hidden ?
                null
                :
                <CartDropdown/>
        }
    </HeaderContainer>
);

//Funzione che ci permette di passare l'intero state ai selector senza specificarlo per ogni funzione
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);