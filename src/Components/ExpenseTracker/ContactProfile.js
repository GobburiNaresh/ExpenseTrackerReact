import './ContactProfile.css';
import Button from '../UI/Button';
const ContactProfile = () => {
    return(
        <div className="contact">
            <div>
            <label htmlFor='fullName'>Full Name</label>
            <input type="text" required/>
            <label htmlFor='photo'>Profile Photo URL</label>
            <input type="text" required/>
            </div>
            <div className='btn'>
                <Button>Update</Button>
            </div>
        </div>
    )
}

export default ContactProfile;