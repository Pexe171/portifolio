import ForestScene from './components/ForestScene.jsx';
import AnimalGuide from './components/AnimalGuide.jsx';

export default function App() {
  return (
    <main>
      {/* TODO: Orquestrar o layout principal do portal, conectando cenas, guias e interações. */}
      <h1>Portal da Floresta Encantada</h1>
      <ForestScene />
      <AnimalGuide />
    </main>
  );
}
