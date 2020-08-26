const express = require('express');
const router = express.Router();
const fila = require('../dados/dados.json')
router.post('/', async(req, res) => {
    // Esse metódo deve receber nome, e-mail e gênero do usuário e retornar id, nome e email e gênero.
    const {nome,email,genero} = req.body;
    try{
        
        // if(fila.indexOf({"email":email}))
        //     return res.status(400).send({error: 'User already exists'});
        return res.send({"name":nome})
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/createUser', router);