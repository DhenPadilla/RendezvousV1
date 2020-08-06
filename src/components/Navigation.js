import React from 'react'
import { withRouter } from 'react-router-dom'
import AuthService from '../services/AuthService'

function Navigation (props) {
    const logout = () => {
        AuthService.logout(() => {
            props.history.push("/login");
        });
    }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-transparent p-12 z-50">
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-white hover:border-white hover:bg-black">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="w-full block md:hidden flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-md lg:flex-grow">
                    <button onClick={logout} className="bg-transparent float-right block mt-4 lg:inline-block lg:mt-0 text-black hover:bg-black hover:border-transparent hover:text-white border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider">
                        log out
                    </button>
                </div>
            </div>
        </nav>
    )
}

// For some reason, had to use withRouter here
export default withRouter(Navigation)