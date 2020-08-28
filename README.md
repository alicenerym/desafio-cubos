# Desafio Cubos

Nesse repositório encontra-se a aplicação desenvolvida como etapa do processo seletivo da empresa de tecnologia cubos. O projeto se baseia em uma API de **gerenciamento de pessoas numa fila**, fazendo **cadastro de usuários** e **visualizações da fila**, além de permitir **acréscimo e retirada de pessoas** à ela, **filtragem por gênero** e **encontrar a posição** de um determinado usuário. Todas as rotas contém algumas validações, que serão descritas posteriormente.

As informações são salvas localmente em dois arquivos tipo *.json* no diretório '/src/dados/' que contém os usuários cadastrados (*cadastrados.json*) e os adicionados à lista (*nafila.json*). Os exemplos de requisições a serem feitas estão na pasta '/src/exemplos/' com o nome de suas respectivas rotas. Por fim, as funções e algorítimos responsáveis por gerenciar a fila estão no diretório 'src/rotas/' em arquivos de extensão *.js* também com os nomes de suas rotas.

# Getting Started
Na pasta raiz do projeto deve-se instalar as bibliotecas necessárias usando o comando:

``` npm install```

Caso ocorra algum erro na instalação, delete a pasta "node_module" e repita o comando anterior. Feito isso, para inializar o servidor Node Js, execute o seguinte:

``` npm start ```

Feito isso, o servidor está pronto para aceitar as requisições, sendo elas:
- *addUser*
- *addToLine*
- *findPosition*
- *showLine*
- *popLine*
- *filterLine*

## createUser
Essa rota consiste no cadastro de novos usuários, sem adiciona-los na fila. Para isso, deve-se passar um JSON por meio da URL *http://127.0.0.1:3000/createUser*, passando o nome do usuário, um email e o genero. Um modelo para esse tipo de requisição é o mostrado abaixo:

```
{
    "nome": "Leandro",
    "email": "leandro@example.com",
    "genero": "Masculino"
}
```

Essa requisição retorna as possíveis resposta:
- *'Usuário já cadastrado! Tente um outro email'* caso já exista um usuário com esse mesmo email;
- *id* do usuário cadastrado com sucesso.
 
## addToLine
Essa rota tem como objetivo adicionar um usuário já cadastrado à fila. A URL desse caso é a  *http://127.0.0.1:3000/addToLine*, passando o id do usuário que deseja-se adicionar à fila. Um modelo para esse tipo de requisição segue abaixo:


```
{
    "id": "aeb76c80-e8e6-11ea-a039-3d4e370e811b"
}
```

Quanto às validações feitas, esssas são as possíveis respostas:
- *'Usuário não encontrado! Confira o id informado'* se o id informado não coincidir com nenhum que esteja cadastrado;
- 'Usuário já está na fila! Informe outro id' caso o id informado corresponda a algum que já esteja na fila;
- *posicaoNaFila* do usuário ao adiciona-lo à fila com sucesso.

## findPosition
Para verificar a posição de um usuário na fila, essa requisição recebe um email e retorna a posição daquele usuário na fila. Usando a URL  *http://127.0.0.1:3000/findPosition* o modelo para esse tipo de requisição é no seguinte formato:

```	
{
		"email": "lara@example.com"
	}
```

Quanto às validações feitas, esssas são as possíveis respostas:
- *'Usuário não encontrado! Confira o id informado'* se o id informado não coincidir com nenhum que esteja cadastrado;
- 'Usuário já está na fila! Informe outro id' caso o id informado corresponda a algum que já esteja na fila;
- *posicaoNaFila* do usuário ao adiciona-lo à fila com sucesso.

 


