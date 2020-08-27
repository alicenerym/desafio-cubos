const express = require('express');
const router = express.Router();
const fs  = require('fs');
const uuid = require('uuid');
router.post('/', async(req, res) => {
    // Esse metódo deve receber nome, e-mail e gênero do usuário e retornar id, nome e email e gênero.
    //https://stackabuse.com/reading-and-writing-json-files-with-node-js/
    const {nome,email,genero} = req.body;
    var id = uuid.v1();
    let newUser = {"_id":id,"nome":nome,"email":email,"genero":genero};
    try{
        fs.readFile('./src/dados/dados.json',(err,data) =>{
            if (err) throw err;
            let usuariosCadastrados = JSON.parse(data);
            // console.log(Object.keys(usuariosCadastrados))
            for (var i in usuariosCadastrados){
                if (usuariosCadastrados[i].email == email) {
                    console.log('entrou')
                    return res.send('Usuário já cadastrado! Tente um outro email')
                }
            }
            usuariosCadastrados.push(newUser)
            fs.writeFile('./src/dados/dados.json',JSON.stringify(usuariosCadastrados,null,1),err =>{
                if (err) throw err;
                return res.send(newUser)
            })
        })
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/createUser', router);