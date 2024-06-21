import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h2>Expense List</h2>
      {Object.keys(expenses).map((key) => (
        <div key={key}>
          <h3>Expense {key}</h3>
          <p>Description: {expenses[key].description}</p>
          <p>Amount: {expenses[key].amount}</p>
          <p>Category: {expenses[key].category}</p>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
