import http from 'k6/http';
import {check, sleep} from 'k6';
import { CommonOptions } from "./options/commonOptions.js";

export default function() {
  /* const data = {username: 'username', password: 'password'};
  let res = http.post('https://myapi.com/login/', data);
    check(res, { 'success login': (r) => r.status === 200 });
    sleep(0.3); */

    const URL = CommonOptions.url;
    group('login', () => {
        group ('login successful', () => {
            console.log(URL)
        })
    })
}
