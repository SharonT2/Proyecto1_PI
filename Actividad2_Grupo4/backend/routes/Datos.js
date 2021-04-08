const express = require('express');
const router = express.Router();
const Datos = require('../services/Datos');

//localhost:3000
router.get('/', async function(req, res, next) {
  try {
    res.json(await Datos.Prueba(req.query.page));
  } catch (err) {
    console.error(`Error en el backend`, err.message);
    next(err);
  }
});

//Registra un usuario
router.post('/Registrar', async function(req, res, next) {
  try {
    res.json(await Datos.Registrar(req.body));
  } catch (err) {
    console.error(`Error registrando usuario`, err.message);
    next(err);
  }
});

//Verifica si puede iniciar sesion
router.post('/IniciarSesion', async function(req, res, next) {
  try {
    res.json(await Datos.IniciarSesion(req.body));
  } catch (err) {
    console.error(`Error Iniciando Sesion`, err.message);
    next(err);
  }
});

//Obtener un usuario
router.post('/GetUsuario', async function(req, res, next) {
  try {
    res.json(await Datos.GetUsuario(req.body));
  } catch (err) {
    console.error(`Error obteniendo usuario`, err.message);
    next(err);
  }
});


//Obtener Publicaciones
router.get('/GetPublicaciones', async function(req, res, next) {
  try {
    res.json(await Datos.GetPublicaciones(req.query.page));
  } catch (err) {
    console.error(`Error obteniendo publicaciones`, err.message);
    next(err);
  }
});

//Crear Publicacion
router.post('/Crear', async function(req, res, next) {
  try {
    res.json(await Datos.Crear(req.body));
  } catch (err) {
    console.error(`Error publicando`, err.message);
    next(err);
  }
});

router.post('/Comentar', async function(req, res, next) {
  try {
    res.json(await Datos.Comentar(req.body));
  } catch (err) {
    console.error(`Error comentando`, err.message);
    next(err);
  }
});

//Obtener comentarios
router.post('/GetComentarios', async function(req, res, next) {
  try {
    res.json(await Datos.GetComentarios(req.body));
  } catch (err) {
    console.error(`Error obteniendo comentarios`, err.message);
    next(err);
  }
});

router.put('/Reestablecer', async function(req, res, next) {
  try {
    res.json(await Datos.Reestablecer(req.body));
  } catch (err) {
    console.error(`Error reestableciendo contraseña`, err.message);
    next(err);
  }
});

router.put('/Actualizar', async function(req, res, next) {
  try {
    res.json(await Datos.Actualizar(req.body));
  } catch (err) {
    console.error(`Error actualizando datos`, err.message);
    next(err);
  }
});

//Obtener un usuario
router.post('/Buscar', async function(req, res, next) {
  try {
    res.json(await Datos.Buscar(req.body));
  } catch (err) {
    console.error(`Error buscando perfil`, err.message);
    next(err);
  }
});

//Ingresar un curso
router.post('/AgregarCurso', async function(req, res, next) {
  try {
    res.json(await Datos.AgregarCurso(req.body));
  } catch (err) {
    console.error(`Error agregando curso`, err.message);
    next(err);
  }
});

//Obtener cursos aprobados
router.post('/GetCursos', async function(req, res, next) {
  try {
    res.json(await Datos.GetCursos(req.body));
  } catch (err) {
    console.error(`Error obteniendo cursos`, err.message);
    next(err);
  }
});


module.exports = router;
