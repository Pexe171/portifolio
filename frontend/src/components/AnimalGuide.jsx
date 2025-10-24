import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const personagens = {
  raposa: {
    nome: 'Raposa Lumina',
    titulo: 'Guia de UX/UI',
    mensagem:
      'Estou aqui para traduzir pixels em emoções. Vamos explorar interações vivas e design centrado nas pessoas!',
    gradiente: 'linear-gradient(135deg, rgba(16, 185, 129, 0.85), rgba(5, 150, 105, 0.95))',
  },
  urso: {
    nome: 'Urso Atlas',
    titulo: 'Guardião do Back-end',
    mensagem:
      'Nenhuma raiz se sustenta sem um tronco forte. Vou revelar como estruturamos APIs robustas e seguras.',
    gradiente: 'linear-gradient(135deg, rgba(251, 191, 36, 0.9), rgba(245, 158, 11, 0.95))',
  },
  coruja: {
    nome: 'Coruja Aurora',
    titulo: 'Mentora de Aprendizado',
    mensagem:
      'Todo código conta uma história. Eu ajudo a decifrar padrões, insights e documentações acolhedoras.',
    gradiente: 'linear-gradient(135deg, rgba(129, 140, 248, 0.9), rgba(99, 102, 241, 0.95))',
  },
};

export function AnimalGuide({ tipo, children }) {
  const personagem = personagens[tipo];

  if (!personagem) return null;

  return (
    <motion.div
      className="animal-guide"
      style={{ backgroundImage: personagem.gradiente }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="animal-guide__icon" aria-hidden>
        {tipo === 'raposa' && '🦊'}
        {tipo === 'urso' && '🐻'}
        {tipo === 'coruja' && '🦉'}
      </div>
      <div className="animal-guide__content">
        <h3>{personagem.titulo}</h3>
        <h2>{personagem.nome}</h2>
        <p>{personagem.mensagem}</p>
        {children}
      </div>
    </motion.div>
  );
}

AnimalGuide.propTypes = {
  tipo: PropTypes.oneOf(['raposa', 'urso', 'coruja']).isRequired,
  children: PropTypes.node,
};

AnimalGuide.defaultProps = {
  children: null,
};

export default AnimalGuide;
