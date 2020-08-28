const express = require('express');
const router = express.Router();
const cadastrados = require('../dados/cadastrados.json');
const nafila = require('../dados/nafila.json');

router.post('/', async(req, res) => {
    // Esse metódo deve receber o e-mail de um usuário e retornar a posição dele na fila.
    const {email} = req.body;
    var idCadastrado;
    var idFila;
    var posicaoFila;
    try{
        for (var i = 0; i<cadastrados.length;i++){
            if (cadastrados[i].email ==email){ 
                idCadastrado  = cadastrados[i]._id;
                break;
            } 
        }

        if (!idCadastrado){
            return res.status(400).send('Usuário não cadastrado. Confira o email informado');
        }else{
            for (var j = 0; j<nafila.length;j++){
                if (nafila[i] == idCadastrado){
                    idFila  = nafila[i];
                    posicaoFila = i+1;
                    break;
                } 
            } 
            if (!idFila){
                return res.status(400).send('Usuário não encontrado na fila. Confira o email informado')
            }else{
                return res.send({"posicaoNaFila":posicaoFila})
            }
        }
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/findPosition', router);