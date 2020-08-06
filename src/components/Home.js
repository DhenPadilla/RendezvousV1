import React, { useEffect, useState, useRef } from 'react'
import Navigation from './Navigation'
import Map from './Map'
import AsyncSelect from 'react-select/async';
import UserContext from '../contexts/UserContext';
import { useQuery, gql } from '@apollo/client'

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


const getUser = 
gql`
    query {
        getUser {
            success
            user {
                id
                firstName
                lastName
                username
                friends {
                    id
                    firstName
                    lastName
                    username
                }
            },
            errors {
                path,
                message
            }
        }
    }
`;

function Home () {

    const { loading, error, data } = useQuery(getUser);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (error) console.log(`Error! ${error.message}`);

    if (data && data.getUser.success) {
        // user.current = data.getUser.user;
        return (
            <div>
                <UserContext.Provider value={data.getUser.user}>
    
                    {/* <AsyncSelect
                        cacheOptions
                        loadOptions={loadOptions}
                        defaultOptions
                        onInputChange={this.handleInputChange}
                    /> */}
                    <Navigation />
                    <Map />
                </UserContext.Provider>
            </div>
        )
    }

}

export default Home