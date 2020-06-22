import axios from 'axios';

class AuthService {
    constructor() {
        this.authenticated = false;
        this.user = {}
    }

    login(creds, cb) {
        try {
            axios.post('/auth/login', {
                username: creds.username,
                password: creds.password
              })
              .then(function (response) {
                this.user = response.data.user;
                localStorage.setItem("token", response.data.token);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        catch (err) {
            console.log(err.message);
        }
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        localStorage.setItem('token', "logout");
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        const authStr = localStorage.getItem('token');
        try {
            axios.get('/auth/authenticate', { 'headers': { 'Authorization': authStr } })
            .then(function (response) {
                if(response.data.success) {
                    console.log("WOO")
                    this.authenticated = true;
                }
                else {
                    this.authenticated = false;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        catch (err) {
            console.log(err);
            this.authenticated = false;
        }
        return this.authenticated;
    }
}

export default new AuthService();