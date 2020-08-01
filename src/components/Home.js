import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Map from './Map'

import { useMutation, gql } from '@apollo/client'

const createFriendshipMutation = gql`
mutation($username:String!) {
	createFriendshipFromUsername(username:$username) {
  	    success,
        message, 
        errors {
            path,
            message
        }
	}
}`;

function Home () {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");

    const [createFriendshipFromUsername, { data }] = useMutation(createFriendshipMutation);

    const createFriendship = async (e) => {
        e.preventDefault();

        let check = await createFriendshipFromUsername({ variables: { username: username }});
        console.log(check);
    }


    return (
        <div>
            <div className="block float-right h-full w-1/3 border-solid border-1">
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                          onSubmit={createFriendship}>
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
                        <div className="flex items-center justify-between">
                            <button type="submit" value="Submit" className="bg-black float-right block mt-4 lg:inline-block lg:mt-0 text-white hover:bg-transparent hover:border-black hover:text-black border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider focus:outline-none focus:shadow-outline">
                                Create Friendship
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Navigation />
            <Map /> */}
        </div>
    )
}

export default Home