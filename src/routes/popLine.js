const express = require('express');
const router = express.Router();
const nafila = require('../dados/nafila.json');
const fs = require('fs');

router.post('/', async(req, res) => {
    // Esse metódo deve retirar da fila a pessoa na primeira posição e retorna-la.
    var primeiroFila;
    var copiaFila = nafila;
    try{
        primeiroFila = nafila[0];
        copiaFila.splice(0,1)
        fs.writeFile('./src/dados/nafila.json',JSON.stringify(copiaFila,null,1),err =>{
            if (err) throw err;
            return res.send({"retiradoDaFila":primeiroFila})
        });
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/popLine', router);