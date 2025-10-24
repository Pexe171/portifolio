import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export function CodeCard({ projeto, onHover }) {
  return (
    <motion.article
      className="code-card"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      onHoverStart={() => onHover?.(projeto)}
      onHoverEnd={() => onHover?.(null)}
    >
      <header className="code-card__header">
        <h3>{projeto.name}</h3>
        {projeto.language && <span className="code-card__badge">{projeto.language}</span>}
      </header>
      <p className="code-card__description">
        {projeto.description || 'Um canto da floresta ainda misterioso, pronto para novas aventuras.'}
      </p>
      <footer className="code-card__footer">
        <a href={projeto.url} target="_blank" rel="noreferrer" className="code-card__link">
          Visitar repositório
        </a>
        <span className="code-card__stars">⭐ {projeto.stars}</span>
      </footer>
    </motion.article>
  );
}

CodeCard.propTypes = {
  projeto: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    language: PropTypes.string,
    stars: PropTypes.number,
    url: PropTypes.string.isRequired,
  }).isRequired,
  onHover: PropTypes.func,
};

CodeCard.defaultProps = {
  onHover: null,
};

export default CodeCard;
