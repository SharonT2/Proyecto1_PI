const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages`, err.message);
    next(err);
  }
});

/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

/* POST usuario  */
router.post('/Registrar', async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    res.json(await programmingLanguages.Registrar(req.body));
  } catch (err) {
    console.error(`Error registrando usuario`, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});

const app = express();

const server = require('http').createServer(app);
const io = require('express')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

module.exports = router;