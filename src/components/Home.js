import React, { useEffect, useState, useRef } from 'react'
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
	getFriendsForUser {
          id,
          username,
          firstName,
          lastName
	}
}`;

function Home () {
    const users = useRef([]);

    const { loading, error, data } = useQuery(getFriendsForUser);

    if (loading) console.log('Loading...');
    if (error) console.log(`Error! ${error.message}`);
    if (data) users.current = data.getFriendsForUser;

    return (
        <div>
            <div>
                {users.current.map(user => (
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