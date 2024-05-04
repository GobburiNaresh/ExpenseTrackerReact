import React from 'react';
import Card from '../UI/Card';
import './ForgotPassword.css';
import Button from '../UI/Button';
const Login = () => {
    return(
        <Card>
            <h1>Forgot Password</h1>
            <form>
                <label htmlFor='password'>New Password</label>
                <input type='password'/>
                <Button>Save</Button>
            </form>
        </Card>
        
    )
}

export default Login;