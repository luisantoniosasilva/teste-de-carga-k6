import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
/* Import para obtenção de métricas
Trade: Consigo adicionar mínimo, máximo, média, percentual...
Rate: Consigo métrica de percentuais. */
import { Trend, Rate, Counter } from 'k6/metrics'; 


// Opções de execução do teste
// export let options = {
//     // Número de usuários virtuais ativos
//     vus: 10,
//     //
//     duration: '5s',
//   };

// export let options = {
//     stages: [
//         { duration: '10s', target: 20 }, // Primeiros 10s sobe o pico para 20 vus
//         { duration: '20s', target: 10 }, // Após 10s os próximos 20s irá descer para 10 vus
//         { duration: '10s', target: 0 }, // Após 30s os próximos 10s descerá para 0 vus
//     ],
// };

export default function () {
    let res = http.get('https://jsonplaceholder.typicode.com/posts'); //Realizando request
    // console.log(res.status) //Imprindo no console a resposta de cada requisição realizada

    // .: Assertiva
    check(res, {
        'is status 200': (r) => r.status === 200, //Validando se todas as requisições obtiveram status 200
    });

    sleep(1);
}