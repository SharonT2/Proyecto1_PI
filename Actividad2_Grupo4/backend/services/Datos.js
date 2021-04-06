const db = require('./db');
const config = require('../config');

async function getMultiple(page = 1){
  const a="Hola";
  return {a}
}

async function IniciarSesion(Busqueda){
  const rows = await db.query(
    `SELECT * FROM Usuario WHERE
    Registro = ? AND 
    Contrasenia = ?;`, 
    [
      Busqueda.Registro,
      Busqueda.Contrasenia
    ]
  );
  const Usuario = rows[0];
  return {
    Usuario
  }
}

async function GetUsuario(Busqueda){
  const rows = await db.query(
    `SELECT * FROM Usuario WHERE
    Registro = ?;`, 
    [
      Busqueda.Registro
    ]
  );
  const Usuario = rows[0];
  return {
    Usuario
  }
}

async function Registrar(Usuario){
  const result = await db.query(
    `INSERT INTO Usuario 
    (Registro,Nombres, Apellidos, Contrasenia, Correo) 
    VALUES 
    (?,?, ?, ?, ?)`, 
    [
      Usuario.Registro,Usuario.Nombres, Usuario.Apellidos,
      Usuario.Contrasenia, Usuario.Correo
    ]
  );
  let message = 'No se registró el usuario';
  if (result.affectedRows) {
    message = 'Se Registró el usuario';
  }
  return {message};
}

async function GetPublicaciones(){
  const rows = await db.query(
    `SELECT * FROM Publicacion`, 
  );
  const data = rows;
  return {
    data
  }
}

async function Crear(Publicacion){
  const result = await db.query(
    `INSERT INTO Publicacion
    (Autor, Nombre, Curso, Catedratico, Mensaje) 
    VALUES 
    (?,?,?,?,?);`, 
    [
      Publicacion.Autor,Publicacion.Nombre, Publicacion.Curso,
      Publicacion.Catedratico, Publicacion.Mensaje
    ]
  );
  let message = 'No se creó la publicación';
  if (result.affectedRows) {
    message = 'Se publicó';
  }
  return {message};
}

async function Comentar(Comentario){
  const result = await db.query(
    `INSERT INTO Comentario(Autor,Mensaje,Publicacion) 
    VALUES 
    (?,?,?);`, 
    [
      Comentario.Autor, Comentario.Mensaje, Comentario.Publicacion
    ]
  );
  let message = 'No se creó el comentario';
  if (result.affectedRows) {
    message = 'Se comentó';
  }
  return {message};
}

async function GetComentarios(Publicacion){
  const rows = await db.query(
    `SELECT * FROM Comentario WHERE
    Publicacion = ?;`, 
    [
      Publicacion.FechaHora
    ]
  );
  const Comentarios = rows;
  return {
    Comentarios
  }
}

async function update(id, programmingLanguage){
  const result = await db.query(
    `UPDATE programming_languages 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`, 
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

module.exports = {
  IniciarSesion,
  Registrar,
  GetUsuario,
  GetPublicaciones,
  Crear,
  Comentar,
  GetComentarios,
  getMultiple,
  update
}
