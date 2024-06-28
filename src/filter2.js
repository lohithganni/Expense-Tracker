import React from "react";
import Table from "./table"
const Filter = ({ value, mainObject }) => {
  const catArray = [];

  // Iterate through the entries of the Map
  mainObject.forEach((expenses, date) => {
    expenses.forEach((obj) => {
      if (obj.category == value) {
        catArray.push(obj);
      }
    });
  });

  return (
    <>
      <h4>{value}</h4>
      {catArray.length > 0 ? (
         
        <Table catArray={catArray} />
      ) : (
        <p>No expenses found for the selected category.</p>
      )}
    </>
  );
};

export default Filter;
