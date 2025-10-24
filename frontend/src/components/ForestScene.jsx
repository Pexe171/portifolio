import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

export function ForestScene({ destaque }) {
  return (
    <section className="forest-scene">
      <div className="forest-scene__layers">
        <div className="layer layer--back" />
        <div className="layer layer--mid" />
        <div className="layer layer--front" />
      </div>
      <AnimatePresence>
        {destaque && (
          <motion.div
            key={destaque.name}
            className="forest-scene__highlight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <h4>{destaque.name}</h4>
            <p>{destaque.description || 'Projeto em constante florescimento.'}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

ForestScene.propTypes = {
  destaque: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
};

ForestScene.defaultProps = {
  destaque: null,
};

export default ForestScene;
