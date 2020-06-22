import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../auth/AuthService'

function ProtectedRoute ({component: Component, ...rest}) {
    return (
        <Route {...rest} render={
            props => {
                if(AuthService.isAuthenticated()) { 
                    return <Component {...props}/>;
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        }/>
    )
}

export default ProtectedRoute