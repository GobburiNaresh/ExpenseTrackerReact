import React,{useRef} from 'react';
import Card from '../UI/Card';
import './ForgotPassword.css';
import Button from '../UI/Button';
const Login = () => {
    const userEmailRef = useRef();
    const forgotHandler = (event) => {
        event.preventHandler();
        const userEmail = userEmailRef.current.value;
        console.log(userEmail);
    }
    return(
        <Card>
            <h1>Forgot Password</h1>
            <form onSubmit={forgotHandler}>
                <label htmlFor='Email'>Email</label>
                <input type='email' ref={userEmailRef}/>
                <Button type='submit'>Send</Button>
            </form>
        </Card>
        
    )
}

export default Login;