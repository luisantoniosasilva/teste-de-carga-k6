import { check, group } from 'k6';
import { LoginRequester } from '../../routes/loginRequest.js';

const loginRequester = new LoginRequester();

export default function () {

    group('login', () => {
        group('login successful', () => {
            let res = loginRequester.loginRequester('eve.holt@reqres.in', 'cityslicka');
            check(res, {
                'success login': (r) => r.status === 200,
                'mandatory parameters': (r) => r.body.includes('token')
            });
        })

        group('login unsuccessful - password', () => {
            let res = loginRequester.loginRequester('eve.holt@reqres.in', null);
            check(res, {
                'unsuccess login': (r) => r.status === 400,
                'missing mandatory parameters': (r) => r.body.includes('Missing password')
            });
        })

        group('login unsuccessful', () => {
            let res = loginRequester.loginRequester(null, 'cityslicka');
            check(res, {
                'unsuccess login': (r) => r.status === 400,
                'missing mandatory parameters': (r) => r.body.includes('Missing email or username')
            });
        })
    })
}
