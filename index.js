import http from 'k6/http';
import { check, sleep, group, fail } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export let options = {
    stages: [
        { duration: '10s', target: 20 }, // Primeiros 10s sobe o pico para 20 vus
        { duration: '20s', target: 10 }, // Após 10s os próximos 20s irá descer para 10 vus
        { duration: '10s', target: 0 }, // Após 30s os próximos 10s descerá para 0 vus
    ],
};

export let GetUserDuration = new Trend('get_user_duration');
export let GetUserFailRate = new Rate('get_user_fail_rate');
export let GetUserSuccessRate = new Rate('get_user_success_rate');
export let GetUserReqs = new Trend('get_user_reqs');

const URL = 'https://reqres.in/api';
const EMAIL = "eve.holt@reqres.in";
const PASSWORD = "cityslicka";
// const data = JSON.parse(open('./data/user.json'));



export default function () {

    group('POST - Login successfully', () => {      
        
        const url = `${URL}/login`
        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const payload = JSON.stringify({
            email: EMAIL,
            password: PASSWORD
        })
        
        let res = http.post(url, payload, params);

        if(!check(res, {
            'is status 200': (r) => r.status === 200,
            "logged successfully": (r) => r.json("token") !== ''
        })){
            fail(res.body)
        }

    })

    group('GET - Single user', () => {
        let res = http.get(`${URL}/users/2`);

        GetUserDuration.add(res.timings.duration);
        GetUserReqs.add(1);
        GetUserFailRate.add(res.status == 0 || res.status > 399);
        GetUserSuccessRate.add(res.status != 0 && res.status < 399);

        check(res, {
            'is status 200': (r) => r.status === 200,
            'verify text': (r) => r.body.includes('To keep ReqRes free, contributions towards server costs are appreciated!')
        });

    });
 
    group('GET - All users', () => {
        let res = http.get(`${URL}/users?page=2`);

        check(res, {
            'is status 200': (r) => r.status === 200
        });

        sleep(1);
    });

    group('POST - Create user', () => {

        const url = `${URL}/users`;

        const payload = JSON.stringify({
            name: 'morpheus',
            job: 'leader'
        });

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let res = http.post(url, payload, params);

        console.log(res.body)

        check(res, {
            'is status 201': (r) => r.status === 201,
            "is name correct": (r) => r.json("name") === "morpheus"
        });
    })
}