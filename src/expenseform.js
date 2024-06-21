import React, { useState } from 'react';
import ExpenseList from './expenseList';

const AddExpenseForm = () => {
  const [mainObject, setMainObject] = useState({});
  const [newKey, setNewKey] = useState('');
  const [newObject, setNewObject] = useState({ description: '', amount: '', category: '' });

  const handleInputChange = (e, field) => {
    setNewObject({
      ...newObject,
      [field]: e.target.value,
    });
  };

  const addObject = () => {
    if (newObject.description && newObject.amount && newObject.category) {
      const key = new Date().toISOString(); // Generate a unique key based on timestamp
      setMainObject({
        ...mainObject,
        [key]: newObject,
      });
      setNewObject({ description: '', amount: '', category: '' }); // Reset newObject to empty
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addObject();
  };

  return (
    <div className="expenseform">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="description"
            placeholder="description"
            value={newObject.description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
          <input
            type="text"
            className="amount"
            placeholder="amount"
            value={newObject.amount}
            onChange={(e) => handleInputChange(e, 'amount')}
          />
          <select
            name="category"
            className="dropdown"
            value={newObject.category}
            onChange={(e) => handleInputChange(e, 'category')}
          >
            <option value="">Select category</option>
            <option value="food">food</option>
            <option value="stationary">stationary</option>
            <option value="clothes">clothes</option>
            <option value="daily-essentials">daily essentials</option>
          </select>
          <input type="submit" value="submit" />
        </div>
      </form>
      <ExpenseList expenses={mainObject} />
    </div>
  );
};

export default AddExpenseForm;
