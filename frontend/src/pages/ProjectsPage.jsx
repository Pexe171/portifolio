import { useEffect, useState } from 'react';
import api from '../api/client.js';
import SectionTitle from '../components/SectionTitle.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { fallbackProjects } from '../utils/fallbackData.js';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [usingFallbackProjects, setUsingFallbackProjects] = useState(false);

  const hasProjects = projects.length > 0;

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data } = await api.get('/api/public/projects');
        setProjects(Array.isArray(data) ? data : []);
        setLoadError(false);
        setUsingFallbackProjects(false);
      } catch (error) {
        console.error('Erro ao carregar projetos', error);
        setLoadError(true);
        setProjects(fallbackProjects);
        setUsingFallbackProjects(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-400">Carregando...</p>;
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Projetos" subtitle="Portfólio" />
      {usingFallbackProjects && (
        <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
          Mostrando projetos de demonstração. Configure o backend para listar seus projetos reais.
        </p>
      )}
      {hasProjects ? (
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-slate-400">
          {loadError ? 'Não foi possível carregar os projetos agora.' : 'Nenhum projeto publicado até o momento.'}
        </p>
      )}
    </div>
  );
}

export default ProjectsPage;
