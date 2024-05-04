import React, { useState,useRef } from 'react';
import Card from '../UI/Card';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import Button from '../UI/Button';

const Login = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const[loginCredentials,setLoginCredentials] = useState('');
    const history = useHistory();

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
            await response.json();
            if (!response.ok) {
                setLoginCredentials('Invalid Credentials!');
                emailInputRef.current.value = '';
                passwordInputRef.current.value = '';
                return;
            }
            setLoginCredentials('');
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
            {loginCredentials&& <h5 className="invalidCredentials">{loginCredentials}</h5>}
            <form className='login' onSubmit={onLoginHandler}>
                <label htmlFor='Email'>Email</label>
                <input type='email' ref={emailInputRef} required />
                <label htmlFor='password'>Password</label>
                <input type='password' ref={passwordInputRef} required />
                <Button type="submit">Login</Button>
                <Link to="/password"><h5>Forgot Password</h5></Link>
            </form>
        </Card>
    )
}

export default Login;
