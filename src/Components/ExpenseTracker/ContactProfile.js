import React, { useState,useRef } from 'react';
import {useHistory} from 'react-router-dom';
import './ContactProfile.css';
import Button from '../UI/Button';

const ContactProfile = () => {
    const [closed, setClosed] = useState(false);
    const history = useHistory();
    const nameInputRef = useRef();
    const urlInputRef = useRef();

    const closeHandler = () => {
        setClosed(true);
        history.replace('/expense');
    }
    if (closed) {
        return null;
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const url = urlInputRef.current.value;

        console.log(name,url);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U',
            {
                method: 'POST',
            body: JSON.stringify({ name, url }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setClosed(true);
            history.replace('/expense');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
        nameInputRef.current.value = '';
        urlInputRef.current.value = '';

    }

    return (
        <form className="contact" onSubmit={onSubmitHandler}>
            <div className="close-btn" onClick={closeHandler}>x</div>
            <h1>Contact Details</h1>
            <div>
                <label htmlFor='fullName'>Full Name</label>
                <input type="text" ref={nameInputRef} required />
                <label htmlFor='photo'>Profile Photo URL</label>
                <input type="text" ref={urlInputRef} required />
            </div>
            <div className='btn'>
                <Button type="submit">Update</Button>
            </div>
        </form>
    )
}

export default ContactProfile;
