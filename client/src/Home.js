// Home.js
import React, { useState } from 'react';

function Home() {
  const [formData, setFormData] = useState({
    id : '', //auto-generated in server.js
    date: '', 
    category: '', 
    description: '', 
    amount: '', 
  });

  const[isExpenseAdded, setIsExpenseAdded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the form data to your Express API to update expenses.json
    const response = await fetch('http://localhost:8080/api/expenses', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setIsExpenseAdded(true);
    }
  };

  return (
    <div>
    {isExpenseAdded ? (
        <h2> Expense was Added ! </h2>
    ): (
      <div>
      <h2>Enter Expenses Form</h2>
      <form onSubmit={handleSubmit}>
      <input
      type="date"
      name="date"
      value={formData.date}
      onChange={handleInputChange}
      required
      />
      <input
      type="text" 
      name="category"
      value={formData.category}
      onChange={handleInputChange}
      required
      />
      <input
      type="text"
      name="description"
      value={formData.description}
      onChange={handleInputChange}
      required
      />
      <input
      type="number"
      name="amount"
      value={formData.amount}
      onChange={handleInputChange}
      required
      />
      <button type="submit">Add Expense</button>
      </form>
      </div>
      )}
      </div>
      );
    }
    
    export default Home;
    