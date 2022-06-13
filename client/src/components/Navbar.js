import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/Auth';

import logo from '../images/logo.png'
function NavBar() {

    return (
        <nav className="w-full border-b">
            <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
                <div aria-label="Home. logo" role="img">
                    <Link to='/'><img className="w-24 md:w-28" src={logo} alt="logo" /></Link>
                </div>
                <div>
                    <div>
                        <ul className="md:text-base items-center py-10 md:flex  justify-center md:relative top-0 bottom-0 left-0 right-0">
                            <li className="text-gray-700 hover:text-gray-900 cursor-pointer text-base lg:text-lg pt-10 md:pt-0">
                                <Link className='neontext2 navbartext' to="/">Home</Link>
                            </li>
                            <li className="cursor-pointer text-base lg:text-lg pt-10 md:pt-0 md:ml-5 lg:ml-10">
                                {!Auth.loggedIn()
                                    ? < Link className='navbartext neontext2' to="/login" >Profile</Link>
                                    : < Link className='navbartext neontext2' to="/profile/me">Profile</Link>}
                            </li>
                        </ul>
                    </div>
                </div>
                {!Auth.loggedIn()
                    ? <Link to="/login" className="btn btn-accent text-lg neon-text3 gamecards">Login</Link>
                    : <Link to="/login" className="btn btn-accent text-lg neon-text3 gamecards" onClick={() => Auth.logout()}>Logout</Link>}

            </div>
        </nav >
    );
}

export default NavBar;