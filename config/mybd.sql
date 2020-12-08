create database proyecto_final;

use proyecto_final;


create table generos (
	id INT NOT NULL auto_increment, 
    genero varchar(50) NOT NULL,
    PRIMARY KEY(id)
)
create table peliculas (
	id INT NOT NULL auto_increment, 
    Titulo varchar(120) NOT NULL,
    director varchar(100) NOT NULL,
    Anio varchar(4),
    genero_id INT NOT NULL,
    FOREIGN KEY (genero_id) REFERENCES generos(id),
    PRIMARY KEY(id)
)