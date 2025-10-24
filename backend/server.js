const express = require('express');
const cors = require('cors');
const githubRoutes = require('./routes/githubRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/github', githubRoutes);

app.get('/', (_req, res) => {
  res.json({ mensagem: 'Bem-vinde ao backend encantado!' });
});

app.listen(PORT, () => {
  // TODO: Configurar monitoramento e observabilidade para acompanhar as aventuras da API em produção.
  console.log(`Servidor mágico escutando na porta ${PORT}`);
});
