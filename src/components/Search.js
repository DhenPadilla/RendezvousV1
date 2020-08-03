import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useMutation, gql } from '@apollo/client'
import searchSvg from '../styles/search.svg'

const searchForUserQuery = gql`
    query ($search:String!) {
        searchForUser(search:$search) {
            success,
            user
        }
    }
`

function Search () {
    const [searchInput, setSearchInput] = useState("");

    const filterUsers = async (input) => {
        let users = await 
        colourOptions.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(filterColors(inputValue));
            }, 1000);
        });


    return (
        <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
        { /*<div className="block float-right h-full w-1/3 border-solid border-1">
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
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" value="Submit" className="bg-black float-right block mt-4 lg:inline-block lg:mt-0 text-white hover:bg-transparent hover:border-black hover:text-black border-solid border border-black rounded py-3 px-6 mt-4 lg:inline-block lg:mt-0 text-black hover:text-teal mr-4 font-sofia font-normal tracking-wider focus:outline-none focus:shadow-outline">
                            Create Friendship
                    </button>
                    </div>
                </form>
            </div>

            <div class="container mx-auto py-8">
                <input class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" 
                       type="search" 
                       placeholder="Search..."
                       onChange={e => setSearchInput(e.target.value)}/>
            </div>
        </div> */}
    )
}