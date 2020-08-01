import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Login from './Login'

function LandingPage (props) {
    const { from } = props.history.location.state || { from: { pathname: "/" } };
    console.log(from.pathname);
    const [showLogin, setShowLogin] = useState()

    // useEffect(() => {
    //     const isAuthenticated = async () => {
    //         try {
    //             const auth = await AuthService.isAuthenticated();
    //             setAuthState(auth);
    //             console.log(authState);
    //         }
    //         catch (err) {
    //             throw(err);
    //         }
    //     }
    //     isAuthenticated();
    // })

    let button
    if (showLogin) {
        button = 
        <button 
            href="/" 
            onClick={() => setShowLogin(!showLogin)} 
            className="bg-black block lg:inline-block lg:mt-12 text-white hover:bg-transparent hover:border-transparent hover:text-black border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider">
                sign up
        </button>
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
                { button }
            </div>
            <Login history={props.history}/>
        </div>
    )
}

export default LandingPage