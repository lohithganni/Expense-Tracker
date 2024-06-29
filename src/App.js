import "./App.css";
import React from "react";
import Home from './Pages/home';
import AddExpense from "./Pages/addExpense";
import ExpenseList from "./Pages/expenseLIst";
import ContactUs from "./Pages/contactus";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/addExpense" element={<AddExpense />} />
          <Route path="/expenseList" element={<ExpenseList />} />
          <Route path="*" element={<ContactUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
