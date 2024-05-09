
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ExpenseTracker.css';
import AuthContext from '../store/auth-context';
import AddExpense from './AddExpense';

const ExpenseTracker = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [profileIncomplete, setProfileIncomplete] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);

    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/');
    };

    const verifyEmailHandler = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                requestType: 'VERIFY_EMAIL'
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
           if(data.email){
                console.log(data);
                confirmEmail(data.email);
           }
        })
        .catch((err)=> {
            console.error(err);
        })
    }

    const confirmEmail = (verifiedEmail) => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                emailVerified: true
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if(data.emailVerified === verifiedEmail){
                setVerifyEmail(true);
            }
        })
        .catch((err)=> {
            console.error(err);
        })
    }

    

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U', {
                    method: 'POST',
                    body: JSON.stringify({
                        idToken: authCtx.token,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) {
                    throw new Error('Error fetching user details');
                }
                const data = await response.json();
                if(data.users[0].displayName) {
                    setUserName(data.users[0].displayName);
                } else {
                    setProfileIncomplete(true);
                }
                if(data.users[0].emailVerified){
                    setVerifyEmail(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDetails();
    }, [authCtx]);

    return (
        <div className="expense">
            <div className="header">
                <h5 className="profile">{profileIncomplete ? 'Your profile is Incomplete ' : userName}</h5>
                <div className="dropdown">
                    <div className="test" onClick={() => setShowDropdown(!showDropdown)}></div>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <button onClick={logoutHandler}>Logout</button>
                            <button onClick={verifyEmailHandler}>
                                {verifyEmail ? "Email Verified" : "Verify Email"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h5 className='welcome'>Welcome To Expense Tracker!...</h5>
            {profileIncomplete && <h5 className='complete-profile'><Link to='/contact'>Complete your profile now</Link></h5>}
            <AddExpense />
        </div>
    );
};

export default ExpenseTracker;
