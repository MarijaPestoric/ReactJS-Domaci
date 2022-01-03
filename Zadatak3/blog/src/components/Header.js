import React from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    return (<div>
        <NavLink to="/">
            Logo
        </NavLink>
        <NavLink to="/add">
            <a>
                Add
            </a>
        </NavLink>

    </div>);
}

export default Header;