import React, { useState, useEffect } from "react";
import ExpenseSum from "./expenseSum";
import FilterCategory from "./filter";
const COUNT_KEY = "count";
const TOTAL_EXPENSE_KEY = "totalExpense";
const MAIN_OBJECT_KEY = "mainObject";
const CATEGORIES = ["food", "stationary", "clothes", "daily-essentials","investments"];

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

  const [mainObject, setMainObject] = useState(() => {
    const storedMainObject = localStorage.getItem(MAIN_OBJECT_KEY);
    if (storedMainObject) {
      try {
        return new Map(JSON.parse(storedMainObject));
      } catch (e) {
        console.error("Failed to parse main object from localStorage", e);
        return new Map();
      }
    }
    return new Map();
  });

  useEffect(() => {
    localStorage.setItem(COUNT_KEY, JSON.stringify(count));
    localStorage.setItem(MAIN_OBJECT_KEY, JSON.stringify(Array.from(mainObject.entries())));
  }, [count, mainObject]);

  useEffect(() => {
    localStorage.setItem(TOTAL_EXPENSE_KEY, JSON.stringify(totalExpense));
  }, [totalExpense]);

  const handleInputChange = (e, field) => {
    setNewExpense({
      ...newExpense,
      [field]: e.target.value,
    });
  };
  
  const deleteKey = (date, expenseToDelete) => {
    setMainObject((prevMainObject) => {
      const newMainObject = new Map(prevMainObject);
      const expenses = newMainObject.get(date);
  
      if (expenses) {
        const expenseIndex = expenses.findIndex(
          (expense) => JSON.stringify(expense) === JSON.stringify(expenseToDelete)
        );
  
        if (expenseIndex !== -1) {
          const amount = parseFloat(expenses[expenseIndex].amount);
  
          if (!isNaN(amount)) {
            setTotals(amount);
          }
  
          const updatedExpenses = expenses.filter(
            (expense) => JSON.stringify(expense) !== JSON.stringify(expenseToDelete)
          );
  
          if (updatedExpenses.length > 0) {
            newMainObject.set(date, updatedExpenses);
          } else {
            newMainObject.delete(date);
          }
        }
      }
  
      return newMainObject;
    });
  };
  
  const setTotals = (expense) => {
    setTotal((prevTotal) => {
      let amount = parseFloat(prevTotal) - expense;
      return amount;
    });
    setCount((prevCount) => prevCount - 1);
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

      setMainObject((prevMainObject) => {
        const newMainObject = new Map(prevMainObject);
        const dateExpenses = newMainObject.get(updatedNewExpense.date) || [];
        newMainObject.set(updatedNewExpense.date, [...dateExpenses, updatedNewExpense]);
        return newMainObject;
      });

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
    setMainObject(new Map());
    setTotal(0);
    localStorage.removeItem(COUNT_KEY);
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
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
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

      <table className="table">
        <thead>
          <tr>
            <th>Total Expense</th>
            <td>{totalExpense}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Total Transactions</th>
            <td>{count}</td>
          </tr>
        </tbody>
      </table>
      <div className="tableTop">
        <h2>Expenses Table</h2>
        <button
          className="btna"
          onClick={clearData}
          style={{ margin: "5px 120px" }}
        >
          Clear
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="description">Description</th>
            <th style={{width:'100px | 10%'}}>Amount</th>
            <th style={{width:'100px | 10%'}}>Category </th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(mainObject.entries()).map(([date, expenses]) => (
            <React.Fragment key={date}>
              <tr>
                <td colSpan="5" ><ExpenseSum expenses={expenses} date={date}/></td>
              </tr>
              {(expenses || []).map((expense, index) => (
                <tr key={`${date}-${index}`}>
                  <td className="description" style={{alignContent:"center", justifyContent:'space-around'}}>{expense.description}</td>               
                  <td style={{alignContent:"center", justifyContent:'space-around'}}>{expense.amount}</td>
                  <td style={{alignContent:"center", justifyContent:'space-around'}}>{expense.category}</td>
                  <td style={{alignContent:"center", justifyContent:'space-around'}}>{expense.time}</td>
                  <td style={{width:'50px',alignContent:'center',padding:'auto'}}><button className="btn-del" style={{borderStyle:'none',backgroundColor:'white'}} onClick={()=>
                    deleteKey(date,expense)
                  }><span class="material-symbols-outlined" id='del-icon' >
                  delete
                  </span ></button></td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="filter">
      <FilterCategory mainObject={mainObject} CATEGORIES={CATEGORIES}/>
      </div>
    </div>
  );
};

export default AddExpenseForm;
