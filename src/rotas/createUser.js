const express = require('express');
const router = express.Router();
const fs  = require('fs');
const uuid = require('uuid');
const cadastrados = require('../dados/cadastrados.json')
router.post('/', async(req, res) => {
    // Esse metódo deve receber nome, e-mail e gênero do usuário e retornar id, nome e email e gênero.
    //https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    const {nome,email,genero} = req.body;
    var id = uuid.v1();
    let newUser = {"_id":id,"nome":nome,"email":email.toLowerCase(),"genero":genero.toUpperCase()};
    try{        
        for (var i = 0; i< cadastrados.length;i++){
            if (cadastrados[i].email.toLowerCase() == email.toLowerCase()) {
                return res.status(400).send('Usuário já cadastrado! Tente um outro email')
            }
        }
        cadastrados.push(newUser)
        fs.writeFile('./src/dados/cadastrados.json',JSON.stringify(cadastrados,null,1),err =>{
            if (err) throw err;
            return res.send(newUser)
    })
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/createUser', router);