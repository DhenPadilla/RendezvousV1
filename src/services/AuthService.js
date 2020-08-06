import axios from 'axios';

const API_URL = "http://localhost:5000/auth/";

const login = (creds) => {
    try {
        return axios({
            method: 'post',
            url: API_URL + 'login',
            data: {
                username: creds.username,
                password: creds.password
            }
        }).then((response) => {
            localStorage.setItem("token", response.data.token);
            return response.data.user;
        });
    }
    catch (err) {
        console.log(err.message);
    }
}

const logout = (cb) => {
    localStorage.removeItem('token');
    cb();
}

const isAuthenticated = async () => {
    const authStr = localStorage.getItem('token');
    if(authStr) {
        try {
            return axios.get(
                API_URL + 'authenticate', 
                {
                    'headers': { 'Authorization': authStr } 
                }
            ).then((response) => {
                console.log("(client): isAuthenticated: " + response);
                return response.data.success;
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    return false;
}

export default {
    // register,
    login,
    logout,
    isAuthenticated
};