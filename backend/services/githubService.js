import axios from 'axios';

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
  },
});

if (process.env.GITHUB_TOKEN) {
  githubApi.defaults.headers.common.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

export const buscarRepositorios = async (username) => {
  if (!username) {
    throw new Error('Informe um usuário do GitHub para explorar a floresta de projetos.');
  }

  const resposta = await githubApi.get(`/users/${username}/repos`, {
    params: {
      sort: 'updated',
      per_page: 100,
    },
  });

  return resposta.data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    url: repo.html_url,
    homepage: repo.homepage,
    topics: repo.topics,
    updatedAt: repo.updated_at,
  }));
};
