import React from 'react';
import { Link } from "react-router-dom";

const CustomLink = ({ to, children}) => {
    return (
        <Link to={to}>
            { children }
        </Link>
    )
}

function Nav() {
    return (
        <nav>
            <ul>
                <CustomLink to="" children="Display Books" />
            </ul>
        </nav>
    );
}

export default Nav;