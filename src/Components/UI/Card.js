import './Card.css';

const Card = (props) => {
    console.log(props);
    return (
        <div className='section'>
            {props.children}
        </div>
    )
}

export default Card;