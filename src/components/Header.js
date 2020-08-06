import React, { useEffect, useState } from 'react'
import logo from '../styles/Rendezvous.svg'
import OutsideNavigation from './OutsideNavigation'
import Navigation from './Navigation'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';

const isAuthenticated = gql`
    query {
        isAuthenticated {
            success,
            errors {
              path,
              message
            }
        }
    }
`;

function Header (props) {
    // const { from } = props.history.location.state || { from: { pathname: "/" } };
    // const [showLogin, setShowLogin] = useState()

    const { data, loading, error } = useQuery(isAuthenticated);

    if (loading) console.log("Loading..."); 

    let navbar

    if (data) {
        console.log(data);
        if (data.isAuthenticated.success) {
            navbar = <Navigation />
        }
        else {
            navbar =  <OutsideNavigation />
        }
    }
    else {
        navbar =  <OutsideNavigation />
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