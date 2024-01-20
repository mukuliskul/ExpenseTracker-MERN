import React, { useState, useEffect } from 'react';


function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  //useEffect hook since we are connecting to an external system
  useEffect(() => {
    fetch('http://localhost:8080/api/expenses')
      .then((response) => response.json())
      .then((data) => setExpenses(data));
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <span>Date: {expense.date} </span>
            <span>Category: {expense.category} </span>
            <span>Description: {expense.description} </span>
            <span>Amount: {expense.amount} </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
