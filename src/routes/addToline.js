const express = require('express');
const router = express.Router();
const fs  = require('fs');

router.post('/', async(req, res) => {
    // Esse metódo deve receber o id do usuário a ser adicionado à fila e deve retornar a posição em que ele está na fila.
    const {id} = req.body;
    let usuariosNaFila
    try{
        fs.readFile('./src/dados/cadastrados.json',(err,data) =>{
            if (err) throw err;
            let usuariosCadastrados = JSON.parse(data);
            for (var i in usuariosCadastrados){
                if (usuariosCadastrados[i]._id == id) {
                    var usuarioEncontrado = usuariosCadastrados[i]._id;
                    break;
                }
            }
            if (!usuarioEncontrado){
                return res.status(400).send('Usuário não encontrado! Confira o id informado')
            }else{
                fs.readFile('./src/dados/nafila.json',(err,naFila) =>{
                    if (err) throw new Error('Algo deu errado')
                    var quantidadeFila = Object.keys(naFila).length;
                    if (quantidadeFila==0){
                        fs.writeFile('./src/dados/nafila.json',JSON.stringify([usuarioEncontrado],null,2),err =>{
                            if (err) throw err;
                            return res.send(1);
                        });
                    }else{
                        usuariosNaFila = JSON.parse(naFila);
                        for (var j in usuariosNaFila){
                            if (usuariosNaFila[j] == id){
                                return res.status(400).send('Usuário já está na fila! Informe outro id');
                            }
                        }
                        usuariosNaFila.push(usuarioEncontrado);
                        const posicaoNaFila = usuariosNaFila.length;
                        fs.writeFile('./src/dados/nafila.json',JSON.stringify(usuariosNaFila,null,1),err =>{
                            if (err) throw err;
                            return res.send({"posicaoNaFila":posicaoNaFila})
                        })
                    }
                });               
            }
        })
    }catch(err){
        return res.status(400).send({error: err});
    }
});
module.exports = app => app.use('/addToLine', router);