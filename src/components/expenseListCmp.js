import React, { useState, useEffect } from "react";
import ExpenseSum from "./expenseSum";
import FilterCategory from "./filter";
import Add from "./add";
const MAIN_OBJECT_KEY = "mainObject";
const TOTAL_EXPENSE_KEY = "totalExpense";
const COUNT_KEY = "count";
const CATEGORIES = [
  "food",
  "stationary",
  "clothes",
  "daily-essentials",
  "investments",
];

const ExpenseListCmp = () => {
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

  const [totalExpense, setTotal] = useState(() => {
    return parseFloat(localStorage.getItem(TOTAL_EXPENSE_KEY)) || 0;
  });

  const [count, setCount] = useState(() => {
    return parseInt(localStorage.getItem(COUNT_KEY), 10) || 0;
  });

  useEffect(() => {
    localStorage.setItem(
      MAIN_OBJECT_KEY,
      JSON.stringify(Array.from(mainObject.entries()))
    );
  }, [mainObject]);

  useEffect(() => {
    localStorage.setItem(TOTAL_EXPENSE_KEY, JSON.stringify(totalExpense));
  }, [totalExpense]);

  useEffect(() => {
    localStorage.setItem(COUNT_KEY, JSON.stringify(count));
  }, [count]);

  const deleteKey = (date, expenseToDelete) => {
    setMainObject((prevMainObject) => {
      const newMainObject = new Map(prevMainObject);
      const expenses = newMainObject.get(date);

      if (expenses) {
        const expenseIndex = expenses.findIndex(
          (expense) =>
            JSON.stringify(expense) === JSON.stringify(expenseToDelete)
        );

        if (expenseIndex !== -1) {
          const amount = parseFloat(expenses[expenseIndex].amount);

          if (!isNaN(amount)) {
            setTotals(amount);
          }

          const updatedExpenses = expenses.filter(
            (expense) =>
              JSON.stringify(expense) !== JSON.stringify(expenseToDelete)
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

  const clearData = () => {
    setCount(0);
    setMainObject(new Map());
    setTotal(0);
    localStorage.removeItem(COUNT_KEY);
    localStorage.removeItem(MAIN_OBJECT_KEY);
    localStorage.removeItem(TOTAL_EXPENSE_KEY);
  };

  return (
    <>
      <Add/>
      <div className="container">
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
          <button className="btna" onClick={clearData} style={{ margin: "0" }}>
            Clear
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="description">Description</th>
              <th style={{ width: "100px | 10%" }}>Amount</th>
              <th style={{ width: "100px | 10%" }}>Category</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(mainObject.entries()).map(([date, expenses]) => (
              <React.Fragment key={date}>
                <tr>
                  <td colSpan="5">
                    <ExpenseSum expenses={expenses} date={date} />
                  </td>
                </tr>
                {(expenses || [])
                  .slice()
                  .reverse()
                  .map((expense, index) => (
                    <tr key={`${date}-${index}`}>
                      <td
                        className="description"
                        style={{
                          alignContent: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        {expense.description}
                      </td>
                      <td
                        style={{
                          alignContent: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        {expense.amount}
                      </td>
                      <td
                        style={{
                          alignContent: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        {expense.category}
                      </td>
                      <td
                        style={{
                          alignContent: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        {expense.time}
                      </td>
                      <td
                        style={{
                          width: "50px",
                          alignContent: "center",
                          padding: "auto",
                        }}
                      >
                        <button
                          className="btn-del"
                          style={{
                            borderStyle: "none",
                            backgroundColor: "white",
                          }}
                          onClick={() => deleteKey(date, expense)}
                        >
                          <span
                            className="material-symbols-outlined"
                            id="del-icon"
                          >
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <div className="filter">
          <FilterCategory mainObject={mainObject} CATEGORIES={CATEGORIES} />
        </div>
      </div>
    </>
  );
};

export default ExpenseListCmp;
