import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './ContactProfile.css';
import Button from '../UI/Button';
import AuthContext from '../store/auth-context';

const ContactProfile = () => {
    const [closed, setClosed] = useState(false);
    const history = useHistory();
    const nameInputRef = useRef();
    const urlInputRef = useRef();
    const authCtx = useContext(AuthContext);

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

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U',{
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
            }),
            headers: {
                'content-type': 'application/json',
            }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Error!!');
            }
            return res.json();
        })
        .then((data) => {
            // Handle response data if needed
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
        });

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDfuDej43mIj2qhanl1mQ3Skj3n769JR7U',
            {
            method: 'POST',
            body: JSON.stringify(
                {   
                    idToken: authCtx.token,
                    displayName: name,
                    photoUrl: url,
                    deleteAttribute: 'name'
                }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Error!!');
            }
            return res.json();
        })
        .then(data => {
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
