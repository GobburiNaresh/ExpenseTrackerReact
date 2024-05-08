import React, { useEffect } from 'react';
import Card from '../UI/Card';

const GetExpenses = ({ expenses, setExpenses }) => {

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
    }, [setExpenses]);

    const deleteHandler = async (id) => {
        try {
            await fetch(`https://expensetracker-172ee-default-rtdb.firebaseio.com/expense/${id}.json`, {
                method: "DELETE"
            });
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
    return (
        <Card>
            <h2>Expense Details</h2>
            <ol>
                {expenses.map((expense) => (
                    <li key={expense.id} className="expenseItem">
                        <h3>
                            {expense.money} -- {expense.description} -- {expense.category}
                        </h3>
                        <div className="editDelete">
                            <button className="delete" onClick={() => deleteHandler(expense.id)}>Delete</button>
                            <button className="edit">Edit</button>
                        </div>
                    </li>
                ))}
            </ol>
        </Card>
    )
}

export default GetExpenses;
