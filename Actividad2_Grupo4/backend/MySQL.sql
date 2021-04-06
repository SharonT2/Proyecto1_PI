CREATE DATABASE Datos;

USE Datos;

CREATE TABLE `Usuario`
(
  `Registro`      INT NOT NULL PRIMARY KEY,
  `Nombres`       VARCHAR(255) NOT NULL ,
  `Apellidos`     VARCHAR(255) NOT NULL ,
  `Contrasenia`   VARCHAR(255) NOT NULL ,
  `Correo`        VARCHAR(255) NOT NULL
);

DROP TABLE Publicacion;
CREATE TABLE Publicacion (
`Autor`       INT NOT NULL, 
`Nombre`       VARCHAR (255),
`Curso`       VARCHAR (255), 
`Catedratico` VARCHAR (255),
`Mensaje`     VARCHAR (255),
`FechaHora`   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY,
 FOREIGN KEY (Autor) REFERENCES Usuario
(Registro) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE Comentario (
`Autor`        VARCHAR (255),
`Mensaje`      VARCHAR (255),
`Publicacion`  DATETIME,
`FechaHora`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP PRIMARY KEY,
 FOREIGN KEY (Publicacion) REFERENCES Publicacion
(FechaHora) ON UPDATE CASCADE ON DELETE CASCADE);

INSERT INTO Publicacion(Autor,Nombre,Curso,Catedratico,Mensaje) 
VALUES 
(201909103,'William Borrayo','Practicas','Herman','una poublicacion');

INSERT INTO Comentario(Autor,Mensaje,Publicacion) 
VALUES 
('William Borrayo','Comentario121','2021-03-31 03:01:49');
/*formato raro date:  2021-03-31T09:01:49.000Z*/

select * from Usuario;
select * from Publicacion;
select * from Comentario;

SELECT 
    Registro, 
    Nombres, 
    Apellidos,
    Correo
FROM
    Usuario
WHERE
    Registro = 201909103 AND 
    Nombres = 'William Alejandro';

