import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AnimalGuide from './components/AnimalGuide.jsx';
import ForestScene from './components/ForestScene.jsx';
import CodeCard from './components/CodeCard.jsx';
import { useGithubRepos, statusConsulta } from './hooks/useGithubRepos.js';

const usuarioPadrao = 'fabio';

function SecaoBioma({ id, titulo, descricao, children }) {
  return (
    <section id={id} className="biome-section">
      <motion.div
        className="biome-section__content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <header>
          <h2>{titulo}</h2>
          <p>{descricao}</p>
        </header>
        {children}
      </motion.div>
    </section>
  );
}

export default function App() {
  const [username, setUsername] = useState(usuarioPadrao);
  const [usuarioBusca, setUsuarioBusca] = useState(usuarioPadrao);
  const [projetoDestaque, setProjetoDestaque] = useState(null);
  const { status, dados, erro } = useGithubRepos(username);

  useEffect(() => {
    setUsuarioBusca(username);
  }, [username]);

  function tratarEnvioFormulario(evento) {
    evento.preventDefault();

    const valorNormalizado = usuarioBusca.trim();
    if (!valorNormalizado || valorNormalizado === username) {
      return;
    }

    setUsername(valorNormalizado);
  }

  return (
    <div className="app">
      <ForestScene destaque={projetoDestaque} />

      <main>
        <section className="hero">
          <motion.div
            className="hero__content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1>Code Forest Portfolio</h1>
            <p>
              Seja bem-vinda e bem-vindo à floresta onde código, design e narrativa vivem em harmonia.
              Cada bioma revela um capítulo da minha trajetória como guardião dos produtos digitais.
            </p>
            <form className="hero__form" onSubmit={tratarEnvioFormulario} noValidate>
              <label className="hero__label" htmlFor="usuario">
                Quer explorar outro guardião? Digite um usuário do GitHub e acione o botão de busca.
              </label>
              <div className="hero__control-group">
                <input
                  id="usuario"
                  type="text"
                  className="hero__input"
                  value={usuarioBusca}
                  onChange={(event) => setUsuarioBusca(event.target.value)}
                  placeholder="fabio"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="hero__button"
                  disabled={status === statusConsulta.loading}
                >
                  {status === statusConsulta.loading ? (
                    <span className="hero__button-content">
                      <span className="hero__spinner" aria-hidden="true" />
                      <span>Buscando...</span>
                    </span>
                  ) : (
                    'Explorar guardião'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </section>

        <SecaoBioma
          id="ux"
          titulo="Bioma da Raposa — Experiências e Interfaces"
          descricao="Aqui moram protótipos, interfaces intuitivas e pesquisas de usabilidade."
        >
          <AnimalGuide tipo="raposa">
            <p>
              Cada cartão representa um estudo ou interface animada criada com carinho. Passe o mouse para
              ouvir a floresta reagir.
            </p>
          </AnimalGuide>
        </SecaoBioma>

        <SecaoBioma
          id="backend"
          titulo="Caverna do Urso — Arquitetura e Back-end"
          descricao="Infraestruturas sólidas mantêm a floresta viva. Explore APIs, automações e integrações."
        >
          <AnimalGuide tipo="urso">
            <p>
              Nosso backend conversa com o GitHub em tempo real e pode ser enriquecido com tokens de acesso
              para relatórios mais profundos.
            </p>
          </AnimalGuide>
        </SecaoBioma>

        <SecaoBioma
          id="aprendizado"
          titulo="Ninho da Coruja — Estudos e Documentação"
          descricao="O aprendizado constante mantém o solo fértil. Veja insights, resumos e novas descobertas."
        >
          <AnimalGuide tipo="coruja">
            <p>
              Em breve, a coruja narrará resumos inteligentes gerados por IA para cada projeto. Por agora,
              ela garante que tudo esteja bem documentado e acolhedor.
            </p>
          </AnimalGuide>
        </SecaoBioma>

        <section className="projects" id="projetos">
          <header className="projects__header">
            <h2>Projetos em destaque do guardião {dados.guardiao || username}</h2>
            {status === statusConsulta.loading && (
              <p className="projects__status" role="status" aria-live="polite">
                Carregando galhos fresquinhos...
              </p>
            )}
            {status === statusConsulta.error && <p className="projects__status projects__status--erro">{erro}</p>}
            {status === statusConsulta.success && dados.total === 0 && (
              <p className="projects__status">Nada brotou por aqui ainda, mas a terra está preparada.</p>
            )}
          </header>

          <div className="projects__grid">
            {dados.repositorios.map((repo) => (
              <CodeCard key={repo.id} projeto={repo} onHover={setProjetoDestaque} />
            ))}
          </div>
        </section>
      </main>

      <footer className="app__footer">
        <p>
          🌿 Projeto concebido como um blueprint vivo para um portfólio interativo. Personalize, evolua e
          compartilhe sua jornada na floresta dos códigos.
        </p>
      </footer>
    </div>
  );
}
