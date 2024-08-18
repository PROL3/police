import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className='container '>
            <nav className=" text-center  ">
                <NavLink to="/" className="text-xl font-bold text-gray-300  hover:text-red-400 ">Home</NavLink>
            </nav>
        </header>)
}

export default Header