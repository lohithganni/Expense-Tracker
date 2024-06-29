import React, { useState, useEffect } from "react";

const COUNT_KEY = "count";
const TOTAL_EXPENSE_KEY = "totalExpense";
const MAIN_OBJECT_KEY = "mainObject";
const CATEGORIES = ["food", "stationary", "clothes", "daily-essentials", "investments"];

const loadFromLocalStorage = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const AddExpenseForm = () => {
  const [count, setCount] = useState(() => loadFromLocalStorage(COUNT_KEY, 0));
  const [totalExpense, setTotal] = useState(() => loadFromLocalStorage(TOTAL_EXPENSE_KEY, 0));
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    localStorage.setItem(COUNT_KEY, JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem(TOTAL_EXPENSE_KEY, JSON.stringify(totalExpense));
  }, [totalExpense]);

  const handleInputChange = (e, field) => {
    setNewExpense({
      ...newExpense,
      [field]: e.target.value,
    });
  };

  const addExpenseToLocalStorage = (updatedNewExpense) => {
    const storedMainObject = localStorage.getItem(MAIN_OBJECT_KEY);
    const mainObject = storedMainObject ? new Map(JSON.parse(storedMainObject)) : new Map();

    const dateExpenses = mainObject.get(updatedNewExpense.date) || [];
    dateExpenses.push(updatedNewExpense);
    mainObject.set(updatedNewExpense.date, dateExpenses);

    localStorage.setItem(MAIN_OBJECT_KEY, JSON.stringify(Array.from(mainObject.entries())));
  };

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const amount = parseFloat(newExpense.amount);
      if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount");
        return;
      }

      const currentTime = new Date();
      const updatedNewExpense = {
        ...newExpense,
        amount,
        time: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: currentTime.toLocaleDateString(),
      };

      setCount((prevCount) => prevCount + 1);
      setTotal((prevTotal) => prevTotal + updatedNewExpense.amount);

      addExpenseToLocalStorage(updatedNewExpense);

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

  return (
    <div className="expenseform" id="expenseList" >
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control"
          placeholder="description"
          value={newExpense.description}
          onChange={(e) => handleInputChange(e, "description")}
        ></textarea>
        <input
            type="number"
            className="form-control h-auto w-auto"
            placeholder="amount"
            value={newExpense.amount}
            onChange={(e) => handleInputChange(e, "amount")}
          />
          
          <select
            name="category"
            className="form-select h-auto w-auto"
            aria-label="Default select example"
            value={newExpense.category}
            onChange={(e) => handleInputChange(e, "category")}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
       
        <input
          type="submit"
          value="submit"
          className="btna"
          
        />
      </form>
    </div>
  );
};

export default AddExpenseForm;
