import Navbar from "../components/navbar";
import TodayExpenses from "../components/todayExpense";
import React, { useState, useEffect } from "react";
import Add from "../components/add";

const Home = () => {
    const MAIN_OBJECT_KEY = "mainObject";
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
    return ( 
        <>
            <Add />
            <Navbar />
            <div className="container">
            <TodayExpenses mainObject={mainObject} />
            </div>
        </>
     );
}
 
export default Home;