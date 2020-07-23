import React, { useState } from 'react'
import AuthService from '../services/AuthService'
import _ from 'lodash'

function Login (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleLogin = async (e) => {
        e.preventDefault();

        let authedUser = AuthService.login({username, password})
        .then(() => {
            props.history.push("/");
            window.location.reload();
        }, (error) => {
            // const resMessage =
            //   (error.response.data.message) || error.toString();
            console.log(error);
        });
    }

 
    // useEffect(() => {
    //      async function checkAuth () {
    //          let authed = await AuthService.isAuthenticated();
    //          if (authed) {
    //            props.history.push("/");
    //          }
    //      }
    //      checkAuth();
    // });

    return (
        <div className="block float-right h-full w-1/3 border-solid border-1">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-sofia mb-2">
                                Username
                            </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="username" 
                                    type="text" 
                                    placeholder="username"
                                    value={username} 
                                    onChange={e => setUsername(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-sofia mb-2">
                                Password
                            </label>
                            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="password" 
                                    type="password" 
                                    placeholder="********"
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex items-center justify-between">
                            <button type="submit" value="Submit" className="bg-black float-right block mt-4 lg:inline-block lg:mt-0 text-white hover:bg-transparent hover:border-black hover:text-black border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider focus:outline-none focus:shadow-outline">
                                login
                            </button>
                            <p className="inline-block align-baseline font-sofia text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </p>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                    &copy;2020 Rendezvous. All rights reserved.
                    </p>
                </div>
            </div>
    )
}

export default Login