import logo from './images/cost.png';
import './navbar.css';
const Navbar = () => {
    return ( 
       <nav className="navbar">
        <div className="logoclass"><img src={logo} alt="logo" className="logo" /> <div><p>Expense tracker</p></div></div>
        <ul className="listitems">
            <li><a href="">Home</a></li>
            <li><a href="">Expense List</a></li>
            <li><a href="">Add Expense</a></li>
            <li><a href="">Contact Us</a></li>
            <li><a href="">more info</a></li>
        </ul>
       </nav>
     );
}
 
export default Navbar;