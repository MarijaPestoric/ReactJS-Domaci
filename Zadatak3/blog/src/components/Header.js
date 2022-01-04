import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';
function Header() {
    return (<div>
        <nav>
            <div className="nav-wrapper">
                <NavLink to="/">
                    <a href="#" className="brand-logo left">Logo</a>
                </NavLink>
                <NavLink to="/add">
                    <ul id="nav-mobile" className="right">
                        <a className="waves-effect waves-light btn"><i className="material-icons left">add</i>Add new</a>
                    </ul>
                </NavLink>
            </div>
        </nav>
    </div>);
}

export default Header;