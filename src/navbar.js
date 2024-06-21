import './navbar.css';
import Hamburger from './hamburger';
import { useState } from 'react';

const Navbar = () => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen);
    };

    const navigationStyle = {
        display: hamburgerOpen ? 'block' : 'none',
    };

    return (
        <div>
            <nav className="navbar">
                <div className="logoclass">
                    <p>Expense Tracker</p>
                </div>
                <ul className="listitems">
                    <li><a href="">Home</a></li>
                    <li><a href="">Expense List</a></li>
                    <li><a href="">Add Expense</a></li>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">More Info</a></li>
                </ul>
                <div className="hamburger" onClick={toggleHamburger}>
                    <Hamburger />
                </div>
            </nav>
            <div style={navigationStyle} className="navigation">
                <ul className="list">
                    <li><a href="">Home</a></li>
                    <li><a href="">Expense List</a></li>
                    <li><a href="">Add Expense</a></li>
                    <li><a href="">Contact Us</a></li>
                    <li><a href="">More Info</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
