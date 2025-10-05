import { useEffect, useMemo, useState } from 'react';
import api from '../api/client.js';
import SectionTitle from '../components/SectionTitle.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { fallbackProjects } from '../utils/fallbackData.js';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const hasProjects = projects.length > 0;
  const displayProjects = useMemo(() => (hasProjects ? projects : fallbackProjects), [hasProjects, projects]);
  const shouldShowGrid = hasProjects || loadError;

  useEffect(() => {
    async function loadProjects() {
      try {
        const { data } = await api.get('/api/public/projects');
        setProjects(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Erro ao carregar projetos', error);
        setLoadError(true);
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
      {shouldShowGrid ? (
        <div className="space-y-4">
          {loadError && (
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Mostrando projetos de demonstração.
            </p>
          )}
          <div className="grid md:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-slate-400">Nenhum projeto publicado até o momento.</p>
      )}
    </div>
  );
}

export default ProjectsPage;
