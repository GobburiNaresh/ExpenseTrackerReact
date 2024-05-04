import React from 'react';
import Card from '../UI/Card';
import {Link} from 'react-router-dom';
import './Login.css';
import Button from '../UI/Button';
const Login = () => {
    return(
        <Card>
            <h1>Login</h1>
            <form>
                <label htmlFor='Email'>Email</label>
                <input type='email'/>
                <label htmlFor='password'>Password</label>
                <input type='password'/>
                <Button>Login</Button>
                <Link to='/Login'><h5>Have an account? Login</h5></Link>
            </form>
        </Card>
        
    )
}

export default Login;