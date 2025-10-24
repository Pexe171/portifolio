import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './routes/githubRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    mensagem: 'Bem-vindo à API Code Forest. Explore /api/github/repos/:username',
  });
});

app.use('/api/github', githubRoutes);

app.use((err, _req, res, _next) => {
  console.error('Erro interno na API Code Forest:', err);
  res.status(500).json({
    mensagem: 'Algo deu errado na floresta de códigos. Tente novamente mais tarde.',
    detalhes: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🌲 Servidor Code Forest ouvindo em http://localhost:${PORT}`);
});
