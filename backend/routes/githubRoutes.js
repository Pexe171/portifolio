const express = require('express');
const { listarRepositoriosEncantados } = require('../controllers/githubController');

const router = express.Router();

// TODO: Definir validações de parâmetros e autenticação mágica antes de tocar a API do GitHub.
router.get('/repositorios', listarRepositoriosEncantados);

module.exports = router;
