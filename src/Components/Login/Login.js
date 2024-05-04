import React, { useState,useRef,useContext } from 'react';
import Card from '../UI/Card';
import { Link, useHistory } from 'react-router-dom';
import classes from './Login.module.css';
import Button from '../UI/Button';
import AuthContext from '../store/auth-context';

const Login = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const[loginCredentials,setLoginCredentials] = useState('');
    const[login,setLogin] = useState(false);
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const onLoginHandler = async (event) => {
        event.preventDefault();

        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            const token = data.idToken;
            if (!response.ok) {
                setLoginCredentials('Invalid Credentials!');
                emailInputRef.current.value = '';
                passwordInputRef.current.value = '';
                return;
            }
            setLoginCredentials('');
            setLogin(true);
            authCtx.login(token);
            history.replace('/expense');
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card>
            <h1>Login</h1>
            {loginCredentials&& <h5 className={classes.invalidCredentials}>{loginCredentials}</h5>}
            <form className='login' onSubmit={onLoginHandler}>
                <label htmlFor='Email'>Email</label>
                <input type='email' ref={emailInputRef} required />
                <label htmlFor='password'>Password</label>
                <input type='password' ref={passwordInputRef} required />
                <Button type="submit">Login</Button>
                <Link to="/password"><h5>Forgot Password</h5></Link>
            </form>
            {login}
        </Card>
    )
}

export default Login;
