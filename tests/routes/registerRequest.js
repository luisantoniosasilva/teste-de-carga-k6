import http from 'k6/http';
import { CommonOptions } from "../options/commonOptions.js";

export class RegisterRequester {

    registerRequester(email, password) {

        const data = JSON.stringify({
            email: email,
            password: password
        });

        const params = {
            headers: { 'Content-Type': 'application/json' }
        };

        let res = http.post(CommonOptions.url + '/api/register', data, params);

        return res;
    }
}
