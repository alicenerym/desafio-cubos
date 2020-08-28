const express = require('express');
const router = express.Router();
const fs  = require('fs');
const nafila = require('../dados/nafila.json');
const cadastrados = require('../dados/cadastrados.json');

router.post('/', async(req, res) => {
    // Esse metódo deve receber o id do usuário a ser adicionado à fila e deve retornar a posição em que ele está na fila.
    const {id} = req.body;
    try{
        for (var i = 0;i<cadastrados.length;i++){
            if (cadastrados[i]._id == id) {
                var usuarioEncontrado = cadastrados[i]._id;
                break;
            }
        }
        if (!usuarioEncontrado){
            return res.status(400).send('Usuário não encontrado! Confira o id informado')
        }else{
            const posicaoNaFila = nafila.length;
            if (posicaoNaFila==0){
                fs.writeFile('./src/dados/nafila.json',JSON.stringify([usuarioEncontrado],null,2),err =>{
                    if (err) throw err;
                    return res.send(1);
                });
            }else{
                for (var j = 0;j<posicaoNaFila;j++){
                    if (nafila[j] == id){
                        return res.status(400).send('Usuário já está na fila! Informe outro id');
                    }
                }
                nafila.push(usuarioEncontrado);
                fs.writeFile('./src/dados/nafila.json',JSON.stringify(nafila,null,1),err =>{
                    if (err) throw err;
                    return res.send({"posicaoNaFila":posicaoNaFila})
                });
            }}
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/addToLine', router);