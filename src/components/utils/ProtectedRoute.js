import React, { useState, useEffect, useRef } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthService from '../../services/AuthService'

class ProtectedRoute extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            isAuth: false
        };
        
    }

    componentDidMount() {
        try {
            AuthService.isAuthenticated().then((response) => {
                console.log("WOO")
                console.log(response);
                this.setState(() => ({ isLoading: false, isAuth: response }))  
            })
        }
        catch (error) {
            console.log(error)
            this.setState(() => ({ isLoading: false, isLoggedIn: false }));
        }
    }

    render() {
        return this.state.isLoading ? null :
            this.state.isAuth ?
            <Route path={this.props.path} component={this.props.component} exact={this.props.exact}/> :
            <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />

    }
}

// function ProtectedRoute ({component: Component, ...rest}) {
//     const [auth, setAuth] = useState(false)
//     const [isLoading, setIsLoading] = useState(false)

//     useEffect(() => {
//         let mounted = false;
//         async function getAuth() {
//             !mounted && setIsLoading(true)
//             try {
//                 const response = await AuthService.isAuthenticated();
//                 !mounted && setAuth(response)  
//             }
//             catch (error) {
//                 console.log(error)
//             }
//             finally {
//                 !mounted && setIsLoading(false)
//             }
//         }
//         getAuth()
//         return () => { mounted = true }
//     }, []);

//     setIsLoading(true)

//     // useEffect(() => {
//     //     return () => { 
//     //       mountedRef.current = false
//     //     }
//     //   }, [])

//     return !isLoading ? (<div>Loading</div>) : 
//     (
//         <Route {...rest} render={
//             (props) => {
//                 if(auth) { 
//                     return <Component {...props}/>;
//                 }
//                 else {
//                     return <Redirect to={
//                         {
//                             pathname: "/login",
//                             state: {
//                                 from: props.location
//                             }
//                         }
//                     } />
//                 }
//             }
//         }/>
//     )
// }

export default ProtectedRoute