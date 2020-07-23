import React from 'react'
import logo from '../styles/Rendezvous.svg'
import OutsideNavigation from './OutsideNavigation'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import AuthService from '../services/AuthService'

function Header() {
    const isAuthenticated = async () => {
        let authed = await AuthService.isAuthenticated();
        return authed;
    }

    let navbar
    if (isAuthenticated) {
        navbar = 
        <Navigation />
    }
    else {
        navbar = 
        <OutsideNavigation />
    }

    return (
        <div className="flex items-center justify-between ml-20 bg-transparent">
            <Link to="/home">
                <img className="fill-current h-6 w-auto mr-2" src={logo} alt="Logo" />
            </Link>

            { navbar }
        </div>
    )
}

export default Header