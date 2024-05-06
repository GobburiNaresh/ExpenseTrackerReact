import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './ExpenseTracker.css';
import AuthContext from '../store/auth-context';

const ExpenseTracker = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [profileIncomplete, setProfileIncomplete] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/');
    };
    const userEmail = localStorage.getItem('email');
    console.log(userEmail);
    const verifyEmailHandler = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U',{
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
                requestType: userEmail
            }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((res) => {
            console.log(res.json());
        }).then((data) => {
            console.log(data);
        }).catch((err)=> {
            console.error(err);
        })
    }

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U',{
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
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDetails();
    },[authCtx]);

    return (
        <div className="expense">
            <div className="header">
                <h5 className="profile">{profileIncomplete ? 'Your profile is Incomplete ' : userName}</h5>
                <div className="dropdown">
                    <div className="test" onClick={() => setShowDropdown(!showDropdown)}></div>
                    {showDropdown && (
                        <div className="dropdown-content">
                            <button onClick={logoutHandler}>Logout</button>
                            <button onClick={verifyEmailHandler}>verifyEmail</button>
                        </div>
                    )}
                    
                </div>
            </div>
            <h5 className='welcome'>Welcome To Expense Tracker!...</h5>
            {profileIncomplete && <h5 className='complete-profile'><Link to='/contact'>Complete your profile now</Link></h5>}
        </div>
    );
};

export default ExpenseTracker;
