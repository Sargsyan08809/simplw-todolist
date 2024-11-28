import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="w-full h-20 bg-red-50">
            <nav className="flex items-center justify-between">
                <ul className="flex justify-between w-44">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/todo">To do</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;