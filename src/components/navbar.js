import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{
          position: "fixed",
          width: "100%",
          zIndex: "10000",
          top: "0",
        }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Expense Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <NavLink to="/" className="nav-link active" aria-current="page" >
                  Home
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/expenseList" className="nav-link" >
                  Expense List
                </NavLink>
              </li>
              <li className="nav-item mx-2">
              <NavLink to="/addExpense" className="nav-link" >
                  Add Expense
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="*" className="nav-link" >
                  contact us
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
