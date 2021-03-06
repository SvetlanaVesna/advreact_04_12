import React, { Component } from 'react'
import {Route, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

//import styled from 'styled-components';

import {signIn, signUp, userErrorSelector, userLoaderSelector} from '../../../ducks/auth'
import SignInForm from '../../auth/SignInForm'
import SignUpForm from '../../auth/SignUpForm'
//import spinner from '../../../static/preloader-xs.png';

//const LoaderIcon = styled.div`
//  width: 166px;
//  height: 166px;
//  background: url(spinner);
//  animation: rotate 2s linear infinite;
//`;

class Auth extends Component {
    static propTypes = {

    };

    render() {
        const {loading, error} = this.props;
        return (
            <div>
                <h2>Auth page</h2>
                <ul>
                    <li><NavLink to = '/auth/sign-in' activeStyle={{color: 'red'}}>Sign In</NavLink></li>
                    <li><NavLink to = '/auth/sign-up' activeStyle={{color: 'red'}}>Sign Up</NavLink></li>
                </ul>
                <Route path='/auth/sign-in' render={() => <SignInForm onSubmit={this.onSignIn}/>} />
                <Route path='/auth/sign-up' render={() => <SignUpForm onSubmit={this.onSignUp}/>} />
                {error !== null &&
                    <h4 style={{color: 'red'}}>{error}</h4>
                }
                {/*loading &&
                  <LoaderIcon/>
                */}
                {loading &&
                <div>Loading...</div>
                }
            </div>
        )
    }

    onSignIn = ({ email, password }) => this.props.signIn(email, password)
    onSignUp = ({ email, password }) => this.props.signUp(email, password)

}

export default connect(state => ({
    error: userErrorSelector(state),
    loading: userLoaderSelector(state)
}), { signIn, signUp })(Auth)