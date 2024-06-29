import React, { useState } from "react";
import Filter from "./filter2";

const FilterCategory = ({ mainObject, CATEGORIES }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <>
      <h4>Select Category for filter</h4>
      <select
        name="category"
        className="form-select h-auto w-auto"
        aria-label="Default select example"
        onChange={handleChange}
      >
        <option value="">Select category</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <Filter value={selectedCategory} mainObject={mainObject} />
    </>
  );
};

export default FilterCategory;
