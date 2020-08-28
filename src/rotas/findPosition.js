const express = require('express');
const router = express.Router();
const cadastrados = require('../dados/cadastrados.json');
const nafila = require('../dados/nafila.json');

router.post('/', async(req, res) => {
    // Esse metódo deve receber o e-mail de um usuário e retornar a posição dele na fila.
    const {email} = req.body;
    var idCadastrado;
    var posicaoFila;
    try{
        for (var i = 0; i<cadastrados.length;i++){
            for (var j = 0; j<nafila.length;j++){
                if (nafila[j] == cadastrados[i]._id && cadastrados[i].email.toLowerCase() ==email.toLowerCase()){
                    idCadastrado = cadastrados[i]._id;
                    posicaoFila = i+1;
                    break;
                } 
            } 
        }
        if (!idCadastrado){
            return res.status(400).send('Usuário não encontrado. Confira o email informado');
        }
        return res.send({"posicaoNaFila":posicaoFila})
        
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/findPosition', router);