import React from "react";
import {connect} from 'react-redux';

import CustomButton from "../custom-button/CustomButton";
import CartItem from '../CartItem/CartItem';
import {selectCartItems} from "../../redux/cart/cart-selectors";

import './CartDropdownStyle.scss';

const CartDropdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
              cartItems.map(cartItem => (
                  <CartItem key={cartItem.id} item={cartItem}/>
              ))
            }
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
});

export default connect(mapStateToProps)(CartDropdown);