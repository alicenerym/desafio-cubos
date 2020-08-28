const express = require('express');
const router = express.Router();
const nafila = require('../dados/nafila.json');
const cadastrados = require('../dados/cadastrados.json');

router.post('/', async(req, res) => {
    // Esse metódo deve retornar uma lista de usuários (nome, gênero e email), bem como a posição de cada um deles na fila (ordenando de primeira posição para última).
    let listaCompleta = []
    try{
       for (var i =0;i<nafila.length;i++ ){
           for (var j = 0; j<cadastrados.length;j++){
                if (nafila[i] == cadastrados[j]._id){
                    listaCompleta.push({"posicaoNaFila":i+1,"nome":cadastrados[j].nome,"genero":cadastrados[j].genero,"email":cadastrados[j].email})
                    break;
                }
           }

       } 
       res.send(listaCompleta);
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/showLine', router);