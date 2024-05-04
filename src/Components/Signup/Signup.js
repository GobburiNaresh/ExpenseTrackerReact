import React, { useRef, useState } from 'react';
import Card from '../UI/Card';
import { Link,useHistory } from 'react-router-dom';
import './Signup.css';
import Button from '../UI/Button';

const Signup = () => {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordRef = useRef();
    const [passwordMessage, setPasswordMessage] = useState(null);
    const history = useHistory();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            setPasswordMessage('Password not Match!');
            return;
        } else {
            setPasswordMessage(null);
        }

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
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
            if(!response.ok) {
                throw new Error('Signup failed');
            }
            await response.json();
            history.replace('/login');
            emailInputRef.current.value = '';
            passwordInputRef.current.value = '';
            confirmPasswordRef.current.value = '';
            
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Card>
            <h1>Signup</h1>
            {passwordMessage && <h5 className="passwordMessage">{passwordMessage}</h5>}
            <form className='signup' onSubmit={onSubmitHandler}>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' ref={emailInputRef} required />
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' ref={passwordInputRef} required />
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password' id='confirmPassword' ref={confirmPasswordRef} required />
                <Button type="submit">Signup</Button>
                <Link to='/login'><h5>Have an account? Login</h5></Link>
            </form>
        </Card>
    );
};

export default Signup;
