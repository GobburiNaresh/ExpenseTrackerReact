import React, { useState, useEffect, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import './AddExpense.css';

const AddExpense = () => {
    const moneySpendRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://expensetracker-172ee-default-rtdb.firebaseio.com/expense.json');
                const data = await response.json();
                const loadedExpenses = [];

                for (const key in data) {
                    loadedExpenses.push({
                        id: key,
                        money: data[key].expense.money,
                        description: data[key].expense.description,
                        category: data[key].expense.category
                    });
                }

                setExpenses(loadedExpenses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addExpenseHandler = async (event) => {
        event.preventDefault();

        const moneySpend = moneySpendRef.current.value;
        const description = descriptionRef.current.value;
        const category = categoryRef.current.value;

        const expenseDetails = {
            money: moneySpend,
            description: description,
            category: category
        };

        try {
            await fetch('https://expensetracker-172ee-default-rtdb.firebaseio.com/expense.json', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    expense: expenseDetails
                })
            });

            const updatedExpenses = [...expenses, expenseDetails];
            setExpenses(updatedExpenses);

            moneySpendRef.current.value = '';
            descriptionRef.current.value = '';
            categoryRef.current.value = '';
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
      <div>
        <Card>
          <form onSubmit={addExpenseHandler}>
            <label htmlFor="Money">MoneySpend</label>
            <input type="number" ref={moneySpendRef} />
            <label htmlFor="description">Description</label>
            <input type="text" ref={descriptionRef} />
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
        <Card>
          <h2>Expense Details</h2>
          <ol>
            {expenses.map((expense) => (
              <li key={expense.id} className="expenseItem">
                <h3>
                  {expense.money} -- {expense.description} -- {expense.category}
                </h3>
                <div className="editDelete">
                    <button className="delete">Delete</button>
                    <button className="edit">Edit</button>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    );
}

export default AddExpense;
