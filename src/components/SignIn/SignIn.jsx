import React, {Component} from 'react';

import './SignInStyle.scss';
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import {auth, signInWithGoogle} from "../../firebase/FirebaseUtils";

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password}=this.state;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''})
        }catch (e) {
            console.log(e);
        }


    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    };

    render() {
        return (
            <div className='sign-in'>
                <h2>already have account</h2>
                <span>sign in with your coc</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} label='email' name='email' type='email'
                               value={this.state.email} required/>
                    <FormInput handleChange={this.handleChange} label='password' name='password' type='password'
                               value={this.state.password} required/>
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton
                            onClick={signInWithGoogle} isGoogleSignIn>
                            {' '}
                            Sign In With Google{' '}
                        </CustomButton>
                    </div>
                </form>

            </div>
        );
    }
}

export default SignIn;