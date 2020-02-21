import React, {useState} from 'react';
import {connect} from 'react-redux'

import './SignInStyle.scss';
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import {googleSignInStart, emailSignInStart} from "../../redux/user/user-action";

const SignIn = ({emailSignInStart}, {googleSignInStart}) => {
    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email, password);
    };

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value})
    };

    return (
        <div className='sign-in'>
            <h2>already have account</h2>
            <span>sign in with your coc</span>

            <form onSubmit={handleSubmit}>
                <FormInput handleChange={handleChange} label='email' name='email' type='email'
                           value={email} required/>
                <FormInput handleChange={handleChange} label='password' name='password' type='password'
                           value={password} required/>
                <div className='buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart} isGoogleSignIn>
                        Sign In With Google
                    </CustomButton>
                </div>
            </form>

        </div>
    );

}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password))
});

export default connect(null, mapDispatchToProps)(SignIn);