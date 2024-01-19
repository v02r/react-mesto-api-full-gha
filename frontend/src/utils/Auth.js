const BASE_URL = "https://api.v02r.students.nomoredomainsmonster.ru";
// const BASE_URL = "http://localhost:3000";

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

class Auth {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    register = ({email, password}) => {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email, password}),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return false;
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    login = ({email, password}) => {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email, password}),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return false;
        }).catch((err) => {
            console.log(`Ошибка: ${err}`);
        });

    };

    getUserInfo = (jwt) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                ...this._headers,
                Authorization: `Bearer ${jwt}`,
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return false;
            }).catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

}

export default new Auth({baseUrl: BASE_URL, headers});
