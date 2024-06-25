import React, { useState, useEffect } from "react";

const AddExpenseForm = () => {
  const COUNT_KEY = "count";
  const EXPENSES_KEY = "expenses";
  const TOTAL_EXPENSE_KEY = "totalExpense";
  const MAIN_OBJECT_KEY = "mainObject";

  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem(COUNT_KEY);
    return storedCount ? parseInt(storedCount, 10) : 0;
  });

  const [totalExpense, setTotal] = useState(() => {
    const storedTotal = localStorage.getItem(TOTAL_EXPENSE_KEY);
    return storedTotal ? parseInt(storedTotal, 10) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem(EXPENSES_KEY);
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    time: "",
  });

  const [mainObject, setMainObject] = useState(() => {
    const storedMainObject = localStorage.getItem(MAIN_OBJECT_KEY);
    return storedMainObject ? JSON.parse(storedMainObject) : [];
  });

  useEffect(() => {
    localStorage.setItem(COUNT_KEY, count);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
    localStorage.setItem(MAIN_OBJECT_KEY, JSON.stringify(mainObject));
  }, [count, expenses, mainObject]);

  useEffect(() => {
    localStorage.setItem(TOTAL_EXPENSE_KEY, totalExpense);
  }, [totalExpense]);

  const handleInputChange = (e, field) => {
    setNewExpense({
      ...newExpense,
      [field]: e.target.value,
    });
  };

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const currentTime = new Date();

      const updatedNewExpense = {
        ...newExpense,
        amount: parseFloat(newExpense.amount),
        time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: currentTime.toLocaleDateString(),
      };

      setExpenses((prevExpenses) => [
        ...(Array.isArray(prevExpenses) ? prevExpenses : []),
        updatedNewExpense,
      ]);

      setCount((prevCount) => prevCount + 1);
      setTotal((prevTotal) => prevTotal + updatedNewExpense.amount);

      // Add to mainObject
      setMainObject((prevMainObject) => [
        ...(Array.isArray(prevMainObject) ? prevMainObject : []),
        updatedNewExpense,
      ]);

      setNewExpense({
        description: "",
        amount: "",
        category: "",
        date: "",
        time: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense();
  };

  const clearData = () => {
    setCount(0);
    setExpenses([]);
    setMainObject([]);
    setTotal(0);
    localStorage.removeItem(COUNT_KEY);
    localStorage.removeItem(EXPENSES_KEY);
    localStorage.removeItem(MAIN_OBJECT_KEY);
    localStorage.removeItem(TOTAL_EXPENSE_KEY);
  };

  return (
    <div className="container" id="expenseList">
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control"
          placeholder="description"
          value={newExpense.description}
          onChange={(e) => handleInputChange(e, "description")}
        ></textarea>
        <div style={{ display: "flex", margin: "5px 5px" }}>
          <select
            name="category"
            className="form-select h-auto w-auto"
            aria-label="Default select example"
            value={newExpense.category}
            onChange={(e) => handleInputChange(e, "category")}
          >
            <option value="">Select category</option>
            <option value="food">food</option>
            <option value="stationary">stationary</option>
            <option value="clothes">clothes</option>
            <option value="daily-essentials">daily essentials</option>
          </select>
          <input
            type="number"
            className="form-control h-auto w-auto"
            placeholder="amount"
            value={newExpense.amount}
            onChange={(e) => handleInputChange(e, "amount")}
          />
        </div>

        <input
          type="submit"
          value="submit"
          className="btna"
          style={{ margin: "5px 120px" }}
        />
      </form>

      
      <table className="table" >
        <thead>
          <tr>
            <th>Total Expense</th>
            <td>{totalExpense}</td>  
          </tr>
        </thead>
        <tbody>
          
            <tr >
            <th>Total Transactions</th>
              <td>{count}</td>
            </tr>
         
        </tbody>
      </table>
      <div className="tableTop">
      <h2>Expenses Table</h2>
      <button className="btna" onClick={clearData} style={{ margin: "5px 120px" }}>
        Clear
      </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {mainObject.slice().reverse().map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>{expense.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddExpenseForm;
