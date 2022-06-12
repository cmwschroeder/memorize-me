import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/Auth';

function NavBar() {
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {!Auth.loggedIn() 
                            ? (<li><Link to="/login" className="text-error">Profile</Link></li>)
                            : (<li><Link to="/profile" className="text-error">Profile</Link></li>)}
                        {!Auth.loggedIn() 
                            ? (<li><Link to="/login" className="text-primary">Login</Link></li>)
                            : (<li><button className="text-primary btn-ghost" onClick={() => Auth.logout()}>Logout</button></li>)}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl text-accent">Home</Link>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                {!Auth.loggedIn() 
                            ? (<li><Link to="/login" className="text-error">Profile</Link></li>)
                            : (<li><Link to="/profile/me" className="text-error">Profile</Link></li>)}
                    {!Auth.loggedIn() 
                            ? (<li><Link to="/login" className="text-primary">Login</Link></li>)
                            : (<li><button className="text-primary btn-ghost" onClick={() => Auth.logout()}>Logout</button></li>)}
                </ul>
            </div>
        </div>
    );
}

export default NavBar;