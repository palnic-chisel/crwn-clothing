import React, {Component} from 'react';
import {connect} from 'react-redux'

import './SignInStyle.scss';
import FormInput from "../form-input/FormInput";
import CustomButton from "../custom-button/CustomButton";

import {googleSignInStart, emailSignInStart} from "../../redux/user/user-action";

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
        const {emailSignInStart} = this.props;
        const {email, password} = this.state;
        emailSignInStart(email, password);
    };

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value})
    };

    render() {
        const {googleSignInStart} = this.props;
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
                            type='button'
                            onClick={googleSignInStart} isGoogleSignIn>
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart(email, password))
});

export default connect(null, mapDispatchToProps)(SignIn);