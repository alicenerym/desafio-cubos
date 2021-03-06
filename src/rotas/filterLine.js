const express = require('express');
const router = express.Router();
const nafila = require('../dados/nafila.json');
const cadastrados = require('../dados/cadastrados.json')

router.post('/', async(req, res) => {
    // Esse metódo deve receber um gênero de usuário e retornar uma lista de usuários com aquele gênero (nome, gênero e email), bem como a posição de cada um deles na fila (ordenando de primeira posição para última).
    const {genero} = req.body;
    let listaGenero = [];
    try{
        for (var j = 0;j<nafila.length;j++){
            for (var i =0;i<cadastrados.length;i++){
                if (cadastrados[i].genero.toUpperCase() == genero.toUpperCase() && nafila[j] ==cadastrados[i]._id){
                    const cadAtual = cadastrados[i];
                    listaGenero.push({"nome":cadAtual.nome,"genero":cadAtual.genero.toUpperCase(),"email":cadAtual.email.toLowerCase(),"posicaoNaFila":j+1})
                    break;
                }
            }
        }
        if (listaGenero.length ==0){
            return res.status(400).send('Não foram encontrados usuários com esse gênero')
        }else{
            return res.send(listaGenero);
        }
        
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/filterLine', router);