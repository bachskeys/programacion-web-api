const { json } = require('body-parser');
const connection = require('../config/conexion.js');


function gerPeliculasPorGenero(req,res){
    if(connection){
        const id =req.params.id;
        let sql = `select * from peliculas Where genero_id=${id}`;
        connection.query(sql, (err, peliculas) => {
            if(err){
                res.send(err)
            } else {
                res.json(peliculas);
            }
        })
    }
}

function getGeneros(req,res){
    if(connection){
        let sql ="select * from generos";
        connection.query(sql,(err,generos)=>{
            if(err){
                    res.send(err)
            }else{
                res.json(generos)
            }
        })
    }
}

function crearGenero(req,res) {
    if(connection){
        const genero = req.body;
        let sql = 'INSERT INTO generos set ?';
        if(!genero.genero){
            return res.status(400).send({error: true, mensaje: "el genero no debe estar vacio"})

        }

        if(genero.genero >50){
            return res.status(400).send({error: true, mensaje: "el genero no debe ser de 50 caracteres."})

        }
        connection.query(sql, [genero], (err, rows) => {
            if(err) {
                res.json(err)
            } else {
                res.json({error: false, data: rows, mensaje: "genero creado con éxito"})
            }
        })
    }
}



module.exports = {
    getGeneros,
    crearGenero,
    gerPeliculasPorGenero
}