# Desafio Cubos

Nesse repositório encontra-se a aplicação desenvolvida como etapa do processo seletivo da empresa de tecnologia cubos. O projeto se baseia em uma API de **gerenciamento de pessoas numa fila**, fazendo **cadastro de usuários** e **visualizações da fila**, além de permitir **acréscimo e retirada de pessoas** à ela, **filtragem por gênero** e **encontrar a posição** de um determinado usuário. Quase todas as rotas contém algumas validações, que serão descritas posteriormente.

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
Essa rota consiste no cadastro de novos usuários, sem adiciona-los na fila. Para isso, deve-se passar um JSON por meio da URL *http://127.0.0.1:3000/createUser*, passando o nome do usuário, um email e o gênero. Um modelo para esse tipo de requisição é mostrado abaixo:

```
{
    "nome": "Leandro",
    "email": "leandro@example.com",
    "genero": "Masculino"
}
```

Essa requisição retorna as possíveis respostas:
- *'Usuário já cadastrado! Tente um outro email'* caso já exista um usuário com esse mesmo email;
- *id* do usuário cadastrado com sucesso.
 
## addToLine
Essa rota tem como objetivo adicionar um usuário já cadastrado à fila. A URL desse caso é a  *http://127.0.0.1:3000/addToLine*, passando o id do usuário que deseja-se adicionar à fila. Um modelo de JSON para esse tipo de requisição segue abaixo:


```
{
    "id": "aeb76c80-e8e6-11ea-a039-3d4e370e811b"
}
```

Quanto às validações feitas, essas são as possíveis respostas:
- *'Usuário não encontrado! Confira o id informado'* se o id informado não coincidir com nenhum que esteja cadastrado;
- *'Usuário já está na fila! Informe outro id'* caso o id informado corresponda a algum que já esteja na fila;
- *posicaoNaFila* do usuário ao adiciona-lo à fila com sucesso.

## findPosition
Para verificar a posição de um usuário na fila, essa requisição recebe um email e retorna a posição daquele usuário na fila. Usando a URL  *http://127.0.0.1:3000/findPosition* o modelo para esse tipo de requisição é conforme o JSON abaixo:

```	
{
     "email": "lara@example.com"
	
}
```

Quanto às validações feitas, essas são as possíveis respostas:
- *'Usuário não encontrado. Confira o email informado'* caso o email não coincida com nenhum que esteja cadastrado;
- *posicaoNaFila* do usuário caso ele seja encontrado na fila.

## showLine
Essa requisição tem como objetivo mostrar os usuários que estão na fila, com as informações que foram cadastradas (nome, email e gênero) e suas respectivas posições na fila, ordenando do primeiro ao último. A URL é  *http://127.0.0.1:3000/showLine*  e o modelo de JSON é vazio, conforme abaixo:

```	
{
	
}
```

Por ser bastante simples, a única resposta possível é a lista de usuários na fila. Segue abaixo um exemplo dessa resposta:
```
[
  {
    "posicaoNaFila": 1,
    "nome": "mauricio",
    "genero": "Masculino",
    "email": "mauricio@example.com"
  },
  {
    "posicaoNaFila": 2,
    "nome": "mariana",
    "genero": "Feminino",
    "email": "mariana@example.com"
  },
  {
    "posicaoNaFila": 3,
    "nome": "LARA",
    "genero": "Feminino",
    "email": "lara@example.com"
  }
]
```

## popLine
A rota *popLine* realiza uma atualização na fila, retirando o primeiro usuário dela. Semelhante a *showLine* o modelo de JSON dessa rota também é vazio, e a URL usada é *http://127.0.0.1:3000/popLine*.

Nessa rota é feita uma única validação, para saber se a fila ainda possui usuários. Sendo assim, as respostas podem ser:
- *'Não existem usuários na fila. Adicione novos antes!'* caso a fila esteja vazia e não possa ser realizado nenhuma retirada de usuário;
- *retiradoDaFila* contendo as informações do usuário retirado da fila.

## filterLine
Essa rota é utilizada para filtrar os usuários na fila a partir do seu gênero, mostrando as informações cadastradas (nome, gênero e email) e sua posição na fila, ordenando pela posição de forma crescente. A URL de exemplo é *http://127.0.0.1:3000/filterLine* e o formato do JSON a ser enviado segue o seguinte padrão:
```
{
    "genero":"Masculino"
}

```

As possíveis respostas nessa rota são:
- *'Não foram encontrados usuários com esse gênero'* caso não tenha nenhum usuário na fila no gênero informado;
- *listaGeneroSelecionado* com os usuários e suas posições na fila filtrados pelo gênero.

## Limitações
- O email deve ser sempre informado com todos os dígitos em minusculo;
- O gênero deve sempre ter a inicial maiúscula e o restante minúsculo.
