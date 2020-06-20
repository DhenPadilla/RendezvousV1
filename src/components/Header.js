import React from 'react'
import logo from '../styles/Rendezvous.svg'
import OutsideNavigation from './Navigation'

function Header() {
    return (
        <div className="flex items-center justify-between ml-20">
            <img className="fill-current h-6 w-auto mr-2" src={logo} alt="Logo" />
            <OutsideNavigation />
        </div>
    )
}

export default Header