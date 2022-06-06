import decode from 'jwt-decode';

class Auth {
    loggedIn() {
        const token = localStorage.getItem('id_token');
        if(token && !this.tokenExpired(token)) {
            return true;
        }
        else {
            return false;
        }
    }

    tokenExpired(token) {
        try {
            const decodedToken = decode(token);
            if(decodedToken * 1000 < Date.now()) {
                return true;
            }
            else {
                return false;
            }
        }
        catch(err) {
            return false;
        }
    }

    logout() {
        localStorage.removeItem('id_token');
        //return to homepage
        window.location.assign('/');
    }
}

export default new Auth();