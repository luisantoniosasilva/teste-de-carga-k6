import { check, group } from 'k6';
import { RegisterRequester } from '../../routes/registerRequest.js';

const registerRequester = new RegisterRequester();

export default function () {

    group('register', () => {
        group('register successful', () => {
            let res = registerRequester.registerRequester('eve.holt@reqres.in', 'cityslicka');
            check(res, {
                'success register': (r) => r.status === 200,
                'missing mandatory parameters': (r) => r.body.includes('id')
            });
        })

        group('register unsuccessful - password', () => {
            let res = registerRequester.registerRequester('eve.holt@reqres.in', null);
            check(res, {
                'unsuccess register': (r) => r.status === 400,
                'missing mandatory parameters': (r) => r.body.includes('Missing password')
            });
        })

        group('register unsuccessful', () => {
            let res = registerRequester.registerRequester(null, 'cityslicka');
            check(res, {
                'unsuccess register': (r) => r.status === 400,
                'missing mandatory parameters': (r) => r.body.includes('Missing email or username')
            });
        })
    })
}
