import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
/* Import para obtenção de métricas
Trade: Consigo adicionar mínimo, máximo, média, percentual...
Rate: Consigo métrica de percentuais. */
import { Trend, Rate, Counter } from 'k6/metrics'; 

/* --------- OPÇÕES DE EXEUÇÃO DO TESTE ---------

export let options = {
    // Número de usuários virtuais ativos
    vus: 10,
    //
    duration: '5s',
  };

export let options = {
    stages: [
        { duration: '10s', target: 20 }, // Primeiros 10s sobe o pico para 20 vus
        { duration: '20s', target: 10 }, // Após 10s os próximos 20s irá descer para 10 vus
        { duration: '10s', target: 0 }, // Após 30s os próximos 10s descerá para 0 vus
    ],
};

export let options = { Ainda não sei para que serve esse bloco não calma aí
  thresholds: {
    'failed requests': ['rate<0.1'], // threshold on a custom metric
    http_req_duration: ['p(95)<500'], // threshold on a standard metric
  },
 }; 
 
 ------------------ */
 
/* Cria uma variável mySuccessRate que será exibida no prompt como "success requests"
e utilizamos ela no código para incrementar a porcentagem de status de sucesso que obtivemos*/
const mySuccessRate = new Rate('success requests'); 

export default function () {
    group('Endpoint Get Posts', () => {
        let res = http.get('https://reqres.in/api/users/2'); //Realizando request
        // console.log(res.status) //Imprindo no console a resposta de cada requisição realizada
    
        // .: Assertiva
        check(res, {
            'is status 200': (r) => r.status === 200, //Validando se todas as requisições obtiveram status 200
          });
          
        mySuccessRate.add(res.status == 200); //incrementando a porcentagem de cada requisição que obteve sucesso
    });

    sleep(1);
}