const { json } = require('body-parser');
const connection = require('../config/conexion.js');

function getPeliculas(req, res) {
    if(connection){
        let sql = 'select * from peliculas';
        connection.query(sql, (err, peliculas) => {
            if(err){
                res.send(err)
            } else {
                console.log(peliculas);
                res.json(peliculas);
            }
        })
    }
}

function getPelicula(req,res) {
    if(connection){
        const id = req.params.id
        let sql =`select * from peliculas where id=${id}`
        connection.query(sql, (err, pelicula) => {
            if(err){
                res.send(err)
            } else {
                console.log(pelicula)
                res.json(pelicula)
            }
        })
    }
}



function crearPelicula(req, res){
    if(connection){
        const pelicula = req.body;

        if(!pelicula.director || !pelicula.Titulo || !pelicula.anio){
            return res.status(400).send({error: true, mensaje: "El titulo y el autor son obligatorios"})
        }
        if(pelicula.Titulo.length >120) {
            return res.status(400).send({error: true, mensaje: "el Titulo no debe exeder de 120 caracteres."})
        }
        if(pelicula.director.length > 100){
            return res.status(400).send({error: true, mensaje: "el director no debe exeder de 100 caracteres."})

        }
        if(pelicula.anio.length != 4){
            return res.status(400).send({error: true, mensaje: "el año no debe ser de 4 caracteres."})

        }
    

        let sql = 'INSERT INTO peliculas set ?';
        connection.query(sql, [pelicula], (err, rows) => {
            if(err) {
                res.json(err)
            } else {
                res.json({error: false, data: rows, mensaje: "pelicula creada con éxito"})
            }
        })
    }
}

function borrarPelicula(req,res){
    if(connection){
        const pelicula = req.body.id;
        let sql = `DELETE FROM peliculas WHERE id=${pelicula}`
        connection.query(sql,(err)=>{
            if(err){
                res.json(err)
            }else{
                res.json({error:false,mensaje:"pelicula borrada con exito"})
            }
        })
    }
}

function editarPelicula(req,res){
    if(connection){
        const pelicula = req.body;
        const{Titulo,director,anio,id} = pelicula;
        console.log(pelicula)
        console.log(anio)
        let sql = `UPDATE peliculas SET Titulo = '${Titulo}', director = '${director}', anio = '${anio}' WHERE id =${id}`

        if(!pelicula.director || !pelicula.Titulo || !pelicula.anio){
            return res.status(400).send({error: true, mensaje: "El titulo y el autor son obligatorios"})
        }
        if(pelicula.Titulo.length >120) {
            return res.status(400).send({error: true, mensaje: "el Titulo no debe exeder de 120 caracteres."})
        }
        if(pelicula.director.length > 100){
            return res.status(400).send({error: true, mensaje: "el director no debe exeder de 100 caracteres."})

        }
        if(pelicula.anio.length != 4){
            return res.status(400).send({error: true, mensaje: "el año no debe ser de 4 caracteres."})
        }
        connection.query(sql, (err, pelicula) => {
            if(err){
                res.send(err)
            } else {
                res.json({erro:false,data:pelicula,mensaje:"pelicula modificada con exito"});
            }
        })
    }
}



module.exports = {
    getPeliculas,
    crearPelicula,
    borrarPelicula,
    editarPelicula,
    getPelicula
}