import http from 'k6/http';
import { CommonOptions } from "../options/commonOptions.js";

export class CreateUserRequester {

    createUserRequester(name, job) {

        const data = JSON.stringify({
            name: name,
            job: job
        });

        const params = {
            headers: { 'Content-Type': 'application/json' }
        };

        let res = http.post(CommonOptions.url + '/api/users', data, params);

        return res;
    }
}
