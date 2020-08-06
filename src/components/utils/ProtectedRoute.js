import React, { useState, useEffect, useRef } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client';

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

function ProtectedRoute (props) {
    const { data, loading, error } = useQuery(isAuthenticated);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(data) {
        if(data.isAuthenticated.success) {
            return (
                <Route path={props.path} component={props.component} exact={props.exact} /> 
            );
        } 
        else {
            return (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
        }
    }

    return (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )
}

export default ProtectedRoute