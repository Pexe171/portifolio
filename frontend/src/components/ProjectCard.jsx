import { Link } from 'react-router-dom';

function ProjectCard({ project }) {
  return (
    <article className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden hover:border-primary-500 transition-colors">
      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-semibold text-white">{project.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-3">{project.description}</p>
        <div className="flex items-center gap-4 text-sm text-primary-500">
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
          <Link to={`/projects/${project.id}`} className="ml-auto text-slate-300 hover:text-white">
            Detalhes
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
