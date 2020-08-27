const express = require('express');
const router = express.Router();
const fs  = require('fs');

router.post('/', async(req, res) => {
    // Esse metódo deve receber o id do usuário a ser adicionado à fila e deve retornar a posição em que ele está na fila.
    const {id} = req.body;
    try{
        fs.readFile('./src/dados/cadastrados.json',(err,data) =>{
            if (err) throw err;
            let usuariosCadastrados = JSON.parse(data);
            // console.log(Object.keys(usuariosCadastrados))
            for (var i in usuariosCadastrados){
                if (usuariosCadastrados[i]._id == id) {
                    var usuarioEncontrado = usuariosCadastrados[i];
                    var posicaoNaFila = i;
                    break;
                }
            }
            if (!usuarioEncontrado){
                return res.status(400).send('Usuário não encontrado! Confira o id informado')
            }else{
                console.log(usuarioEncontrado)
                let usuariosNaFila
                fs.readFile('./src/dados/nafila.json',(err,naFila) =>{
                    if (err) throw err;
                    console.log(Object.keys(naFila).length)
                    if (Object.keys(naFila).length==0){
                        // console.log('oi')
                        fs.writeFile('./src/dados/nafila.json',JSON.stringify(usuarioEncontrado,null,1),err =>{
                            if (err) throw err;
                            console.log('oi');
                            return res.send(posicaoNaFila)
                        })
                    }
                    usuariosNaFila = JSON.parse(naFila);
                    usuariosNaFila.push(usuarioEncontrado)
                })
                fs.writeFile('./src/dados/nafila.json',JSON.stringify(usuariosNaFila,null,1),err =>{
                    if (err) throw err;
                    return res.send(posicaoNaFila)
                })
            }
        })
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/addToLine', router);