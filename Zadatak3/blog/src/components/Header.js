import React from 'react';
import { NavLink } from "react-router-dom";
import './Header.css';
import Hodophile from '../hodophile.png'
function Header() {
    return (<div>
        <nav>
            <div className="nav-wrapper">
                <NavLink to="/">
                    <a href="#" className="brand-logo left"> <img className='logo' src={Hodophile} alt='logo'/></a>
                </NavLink>
                <NavLink to="/add">
                    <ul id="nav-mobile" className="right">
                        <a className="waves-effect waves-light btn add-btn"><i className="material-icons left">add</i>Add new</a>
                    </ul>
                </NavLink>
            </div>
        </nav>
    </div>);
}

export default Header;