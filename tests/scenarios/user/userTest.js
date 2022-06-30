import { check, group } from 'k6';
import { CreateUserRequester } from '../../routes/createUserRequest.js';

const createUserRequester = new CreateUserRequester();

export default function () {

    const USERS = [
        {nome: 'Maria', job: 'leader'}, 
        {nome: 'Luis', job: 'QA'}
    ]

    group('user', () => {
        group('create user successful', () => {
            USERS.forEach(function(user, i) {
                let res = createUserRequester.createUserRequester(user.nome, user.job);
                check(res, {
                    'success login': (r) => r.status === 201,
                    'mandatory parameters': (r) => r.body.includes('id'),
                    'created successful': (r) => r.body.includes(user.nome, user.job)
                });
            })
        })
    })
}
