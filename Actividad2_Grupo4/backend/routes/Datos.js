const express = require('express');
const router = express.Router();
const Datos = require('../services/Datos');

//localhost:3000
router.get('/', async function(req, res, next) {
  try {
    res.json(await Datos.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
});

//Registra un usuario
router.post('/Registrar', async function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
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
    console.error(`Error while getting usuario`, err.message);
    next(err);
  }
});

//Obtener un usuario
router.post('/GetUsuario', async function(req, res, next) {
  try {
    res.json(await Datos.GetUsuario(req.body));
  } catch (err) {
    console.error(`Error while getting usuario`, err.message);
    next(err);
  }
});


//Obtener Publicaciones
router.get('/GetPublicaciones', async function(req, res, next) {
  try {
    res.json(await Datos.GetPublicaciones(req.query.page));
  } catch (err) {
    console.error(`Error while getting publicaciones`, err.message);
    next(err);
  }
});

//Crear Publicacion
router.post('/Crear', async function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
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
    console.error(`Error while getting comentarios`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await Datos.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});


module.exports = router;
