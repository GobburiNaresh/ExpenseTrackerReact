import React,{useRef} from 'react'
import Card from '../UI/Card';
import Button from '../UI/Button';
import './AddExpense.css';

const AddExpense = () => {
    const moneySpendRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    const addExpenseHandler = (event) => {
        event.preventDefault();

        const moneySpend = moneySpendRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;

        const expenseDetails = {
            money: moneySpend,
            description: description,
            category: category
        }
        console.log(expenseDetails);


        moneySpendRef.current.value = '';
        descriptionRef.current.value = '';
        categoryRef.current.value = '';

    }
    return(
        <Card>
            <form onSubmit={addExpenseHandler}>
                <label htmlFor="Money">MoneySpend</label>
                <input type="number" ref={moneySpendRef}/>
                <label htmlFor="description">Description</label>
                <input type="text" ref={descriptionRef}/>
                <label htmlFor="category">Category</label>
                <select id="category" className=".select" ref={categoryRef}>
                <option value="">Select a category</option>
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>
                <Button>Submit</Button>
            </form>
        </Card>
        
    )

}

export default AddExpense;