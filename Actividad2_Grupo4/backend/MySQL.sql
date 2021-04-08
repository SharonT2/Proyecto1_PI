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

CREATE TABLE Curso (
`Usuario`     INT NOT NULL, 
`Codigo`      INT,
`Nombre`      VARCHAR (255),
`Creditos`    INT,
 FOREIGN KEY (Usuario) REFERENCES Usuario
(Registro) ON UPDATE CASCADE ON DELETE CASCADE);

select * from Usuario;
select * from Publicacion;
select * from Comentario;
select * from Curso;
