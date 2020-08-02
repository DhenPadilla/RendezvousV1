import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import Map from './Map'
import AsyncSelect from 'react-select/async';

import { useMutation, useQuery, gql } from '@apollo/client'

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


const getFriendsForUser = gql`
query {
	allFriendsForUser {
          id,
          username,
          firstName,
          lastName
	}
}`;

function Home () {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");

    // const [createFriendshipFromUsername, { data }] = useMutation(createFriendshipMutation);
    // const [getFriends, { data }]  = useQuery(getFriendsForUser);

    // const createFriendship = async (e) => {
    //     e.preventDefault();

    //     let check = await createFriendshipFromUsername({ variables: { username: username }});
    //     console.log(check);
    // }

    // const getFriendsFromUser = async () => {
    //     let users = await getFriends();
    //     setUsers(users);
    // }

    const { loading, error, data } = useQuery(getFriendsForUser);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


    return (
        <div>
            <div>
                {data.users.map(user => (
                    <div key={user.id}>
                        {user.username}, {user.firstName}
                    </div>
                ))}
            </div>
            {/* <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions
                onInputChange={this.handleInputChange}
            /> */}
            {/* <Navigation />
            <Map /> */}
        </div>
    )
}

export default Home