import { useEffect, useState } from 'react';
import axios from 'axios';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

export function useGithubRepos(username) {
  const [status, setStatus] = useState(STATUS.idle);
  const [dados, setDados] = useState({ total: 0, repositorios: [] });
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (!username) {
      return;
    }

    let ativo = true;
    const buscarRepositorios = async () => {
      setStatus(STATUS.loading);
      setErro(null);

      try {
        const resposta = await axios.get(`/api/github/repos/${username}`);
        if (!ativo) return;
        setDados(resposta.data);
        setStatus(STATUS.success);
      } catch (error) {
        if (!ativo) return;
        setErro(
          error.response?.data?.mensagem ||
            'Não conseguimos conversar com a coruja do GitHub agora.',
        );
        setStatus(STATUS.error);
      }
    };

    buscarRepositorios();

    return () => {
      ativo = false;
    };
  }, [username]);

  return { status, dados, erro };
}

export const statusConsulta = STATUS;
