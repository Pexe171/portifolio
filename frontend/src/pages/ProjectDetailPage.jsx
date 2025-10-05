import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client.js';

function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const { data } = await api.get(`/api/public/projects/${id}`);
        setProject(data);
      } catch (err) {
        setError('Projeto não encontrado');
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [id]);

  if (loading) {
    return <p className="text-center text-slate-400">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center text-slate-400">{error}</p>;
  }

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-white">{project.title}</h1>
        <div className="flex gap-4 text-sm text-primary-500">
          {project.projectUrl && (
            <a href={project.projectUrl} target="_blank" rel="noreferrer">
              Ver projeto
            </a>
          )}
          {project.repositoryUrl && (
            <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
              Repositório
            </a>
          )}
        </div>
      </header>
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="w-full rounded-xl border border-slate-800" />
      )}
      <p className="text-slate-300 whitespace-pre-line">{project.description}</p>
    </article>
  );
}

export default ProjectDetailPage;
