const express = require('express');
const routes = express.Router();


const peliculasController = require('../controllers/PeliculasController');


routes.get('/', peliculasController.getPeliculas);


routes.post('/crear-pelicula', peliculasController.crearPelicula);

routes.put('/editar-pelicula',peliculasController.editarPelicula);

routes.delete("/borrar-pelicula",peliculasController.borrarPelicula);

routes.get('/pelicula/:id',peliculasController.getPelicula);




module.exports = routes;