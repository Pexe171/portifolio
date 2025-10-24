import { buscarRepositorios } from '../services/githubService.js';

export const listarRepositorios = async (req, res, next) => {
  try {
    const { username } = req.params;
    const repositorios = await buscarRepositorios(username);

    res.json({
      guardiao: username,
      total: repositorios.length,
      repositorios,
    });
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({
          mensagem: 'Esse guardião ainda não plantou projetos por aqui. Confira o usuário informado.',
        });
      }

      if (status === 403) {
        return res.status(403).json({
          mensagem: 'Chegamos ao limite de visitas na floresta GitHub. Tente novamente mais tarde ou adicione um token.',
        });
      }
    }

    return next(error);
  }
};
