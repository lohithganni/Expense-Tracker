import { NavLink } from "react-router-dom";

const Add = () => {
    return (
        <div className="add">
        <NavLink to="/addExpense" className="nav-link">
          <span class="material-symbols-outlined">add_circle</span>
        </NavLink>
      </div>
      );
}
 
export default Add;