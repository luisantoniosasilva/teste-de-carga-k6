import http from 'k6/http';
import { check, sleep } from 'k6';
import { CommonOptions } from "../options/commonOptions.js";

export class LoginRequester {

    loginRequester(email, password) {

        const data = JSON.stringify({
            email: email,
            password: password
        });

        const params = {
            headers: { 'Content-Type': 'application/json' }
        };

        let res = http.post(CommonOptions.url + '/api/login', data, params);

        return res;
    }
}
