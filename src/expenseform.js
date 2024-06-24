import React, { useState, useEffect } from "react";

const AddExpenseForm = () => {
  const COUNT_KEY = "count";
  const EXPENSES_KEY = "expenses";
  const TOTAL_EXPENSE_KEY = "totalExpense";

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

  useEffect(() => {
    localStorage.setItem(COUNT_KEY, count);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  }, [count, expenses]);

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
        time: currentTime.getTime(),
        date: currentTime.toDateString(),
      };

      setExpenses((prevExpenses) => {
        return [
          ...(Array.isArray(prevExpenses) ? prevExpenses : []),
          updatedNewExpense,
        ];
      });

      setCount((prevCount) => prevCount + 1);
      setTotal((prevTotal) => prevTotal + updatedNewExpense.amount); 

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
          className="btn btn-primary"
          style={{ margin: "5px 120px" }}
        />
      </form>
    </div>
  );
};

export default AddExpenseForm;
