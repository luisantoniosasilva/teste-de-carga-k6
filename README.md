# Projeto de estudo sobre o framework k6

Este projeto é um estudo sobre o framework de teste de carga [k6](https://k6.io). Para este estudo está sendo utilizada a api [REQ|RES](https://reqres.in/).
## 📜 O k6
Como descrito no [próprio site](https://k6.io/docs/) da ferramenta o k6 é uma ferramenta de teste de carga de código aberto, gratuito e centrado no desenvolvedor e extensível. Usando o k6, você pode testar a confiabilidade e o desempenho de seus sistemas e detectar regressões e problemas de desempenho.

## ⚙️ Como instalar o k6
As formas de instalação do k6 podem ser encontradas na página oficial do framework clicando [aqui](https://k6.io/docs/getting-started/installation/).

## ▶️ Como executar este projeto
Após clonar o projeto para sua máquina execute os seguintes comandos:

```bash
npm install
```

```bash
k6 run index.js
```

## 🗂 Organização do projeto

```
├── data (Massa de dados)
├── tests
│   ├── options (Arquivos de configurações. Ex: Arquivo de variável de ambiente)
│   ├── routes (Rotas utilizadas nos testes)
│   ├── scenarios (Cenários de testes)
|   |   ├── auth
|   |   ├── user
```

## 🏋🏽 Exemplo de criação de um teste

1) Dentro da pasta routes criamos um arquivo chamado `NomeDaRota + Request.js`, exemplo createUserRequest.js
2) Dentro deste arquivo criamos uma classe que irá conter nossa requisição
3) Criamos então uma constante `data` que recebe o corpo da requisição, quando existente. Neste caso utilizamos a função `JSON.stringify()` para converter nossos valores JS para uma string
4) Uma constante `params` que recebe o cabeçalho, quando existente
5) uma variável res que recebe a resposta da nossa requisição `POST`
6) Nossa requisição post é formada pela URL (que importamos do nosso arquivo commonOptions) + as constantes necessárias criadas nos passos 3 e 4

Obs: A URL da requisição foi colocada nesse arquivo `commonOptions` para facilitar a manutenção e não termos que alterar arquivo por arquivo em caso de necessidade.

```JS
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
```
7) Posteriormente criamos um arquivo de teste dentro da pasta scenarios, arquivo este que executaremos ao rodar o teste
8) Importamos e inicializamos nosso arquivo criada no passo 1
9) Utilizamos a função `group()`para agrupar nossos casos de teste
10) Criamos uma variável, no exemplo `res` repa receber o retorno da requisição
11) E com o comando `check()` realizamos validações no retorno recebido no passo 5

```JS
import { check, group } from 'k6';
import { CreateUserRequester } from '../../routes/createUserRequest.js';

const createUserRequester = new CreateUserRequester();

export default function () {

    group('user', () => {
        group('create user successful', () => {
            let res = createUserRequester.createUserRequester('Maria', 'QA');
            check(res, {
                'success login': (r) => r.status === 201,
                'mandatory parameters': (r) => r.body.includes('id')
            });
        })
    })
}

```
