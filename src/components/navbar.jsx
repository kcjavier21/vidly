import React  from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-sm navbar-light" style={{ 
            display: 'inline'}}>

                <div className="navbar-nav">
                    <a className="navbar-brand" style={{ backgroundColor: 'none'}}>Vidly</a>
                    <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                    <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                    <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                    <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                    <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                </div>
           
        </nav>

    // <nav className="navbar navbar-light bg-light" style={{ borderStyle: 'solid', borderColor: 'black', }} >
    //     <span className="navbar-brand mb-0 h1">Vidly</span>
    //     <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
    //     <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
    //     <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
    // </nav> 
    );
};
 
export default NavBar;