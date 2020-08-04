import React, { useEffect, useState, useRef } from 'react'
import Navigation from './Navigation'
import Map from './Map'
import AsyncSelect from 'react-select/async';
import UserContext from '../contexts/UserContext';

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


const getUser = 
gql`{
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
            }
        }
    }
}`;

function Home () {

    const { loading, error, data } = useQuery(getUser);

    if (loading) console.log('Loading...');
    if (error) console.log(`Error! ${error.message}`);
    // if (data) user.current = data.getUser;

    return (
        <div>
            <UserContext.Provider value={data}>

            </UserContext.Provider>
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