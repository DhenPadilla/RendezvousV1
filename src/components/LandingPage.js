import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Login from './Login'
import { useQuery, gql } from '@apollo/client';
import Signup from './Signup';

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

function LandingPage (props) {
    const { from } = props.history.location.state || { from: { pathname: "/" } };
    const [showLogin, setShowLogin] = useState(true)

    const { data, loading, error } = useQuery(isAuthenticated);

    if (loading) console.log("Loading..."); 
    if (data) {
        console.log(data);
        if (data.isAuthenticated.success) {
            props.history.push("/");
            window.location.reload();
        }
    }

    return (
        <div className="inline-flex h-full w-screen lg:pl-24 lg:pr-48 lg:pt-24 items-center justify-between">
            <div className="block h-full w-1/2">
                <h1 className="font-sofia w-full font-bold lg:text-5xl">
                    MEET
                    &#x26;
                    DISCOVER
                </h1>
                <h4 className="font-sofia font-light text-xl w-full pr-20 md:w-50 md:text-lg lg:w-full">
                    Rendezvous provides an efficient method to meet up with 
                    friends, removing the unnecessary clutter when organising meetups.
                </h4>
            </div>
            { (showLogin) ? 
                ( <Login history={props.history} setShowLogin={setShowLogin} /> ) : 
                ( <Signup history={props.history} setShowLogin={setShowLogin} /> ) 
            }

        </div>
    )
}

export default LandingPage