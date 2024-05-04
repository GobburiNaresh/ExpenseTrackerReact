import React from 'react';
import Card from '../UI/Card';
import {Link} from 'react-router-dom';
import './Signup.css';
import Button from '../UI/Button';
const Signup = () => {
    return(
        <Card>
            <h1>Signup</h1>
            <form>
                <label htmlFor='Email'>Email</label>
                <input type='email'/>
                <label htmlFor='password'>Password</label>
                <input type='password'/>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <input type='password'/>
                <Button>Signup</Button>
                <Link to='/Login'><h5>Have an account? Login</h5></Link>
            </form>
        </Card>
        
    )
}

export default Signup;