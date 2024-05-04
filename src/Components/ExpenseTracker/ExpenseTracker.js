import React from 'react';
import {Link} from 'react-router-dom';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
    return (
        <div className="expense">
            <h5>Welcome To Expense Tracker!...</h5>
            <h5>Your profile is Incomplete<Link to='/contact'> Complete now</Link></h5>
        </div>
    )
}

export default ExpenseTracker;