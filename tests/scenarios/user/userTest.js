import { check, group } from 'k6';
import { CreateUserRequester } from '../../routes/createUserRequest.js';
import { SharedArray } from 'k6/data';

const createUserRequester = new CreateUserRequester();

const users = new SharedArray('users', function () {
    const users = JSON.parse(open('../../../data/user.json'));
    return users;
});

export default function () {

    group('user', () => {
        group('create user successful', () => {
            let nome = users[Math.floor(Math.random() * users.length)].nome
            let job = users[Math.floor(Math.random() * users.length)].job

            console.log(nome, job)

            let res = createUserRequester.createUserRequester(nome, job);

            check(res, {
                'success login': (r) => r.status === 201,
                'mandatory parameters': (r) => r.body.includes('id'),
                'created successful': (r) => r.body.includes(nome, job)
            });
        })
    })
}
