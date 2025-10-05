import { useEffect, useMemo, useState } from 'react';
import api from '../api/client.js';
import SectionTitle from '../components/SectionTitle.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { fallbackProfile, fallbackProjects } from '../utils/fallbackData.js';

function HomePage() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const displayProfile = useMemo(() => profile ?? fallbackProfile, [profile]);
  const displayProjects = useMemo(() => (projects.length > 0 ? projects : fallbackProjects), [projects]);
  const profileInitials = useMemo(() => {
    if (displayProfile.photoUrl) {
      return '';
    }
    if (displayProfile.initials) {
      return displayProfile.initials;
    }
    if (!displayProfile.fullName) {
      return '??';
    }
    const [first = '', second = ''] = displayProfile.fullName.trim().split(' ');
    return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
  }, [displayProfile]);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileResponse, projectsResponse] = await Promise.all([
          api.get('/api/public/profile'),
          api.get('/api/public/projects')
        ]);
        setProfile(profileResponse.data ?? null);
        setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data.slice(0, 3) : []);
      } catch (error) {
        console.error('Erro ao carregar dados', error);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-400">Carregando...</p>;
  }

  return (
    <div className="space-y-16">
      <section className="flex flex-col md:flex-row items-center gap-10">
        {displayProfile.photoUrl ? (
          <img
            src={displayProfile.photoUrl}
            alt={displayProfile.fullName}
            className="w-40 h-40 rounded-full object-cover border-4 border-primary-500 shadow-lg"
          />
        ) : (
          <div className="w-40 h-40 rounded-full border-4 border-primary-500 shadow-lg bg-primary-500/20 flex items-center justify-center">
            <span className="text-3xl font-semibold text-primary-200">{profileInitials}</span>
          </div>
        )}
        <div className="space-y-4">
          <p className="uppercase text-xs tracking-[0.35em] text-primary-500">Bem-vindo</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{displayProfile.fullName}</h1>
          <p className="text-lg text-slate-300">{displayProfile.role}</p>
          <p className="text-slate-400 max-w-2xl">{displayProfile.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {displayProfile.githubUrl && (
              <a href={displayProfile.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {displayProfile.linkedinUrl && (
              <a href={displayProfile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {displayProfile.email && <a href={`mailto:${displayProfile.email}`}>Email</a>}
          </div>
          {loadError && (
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Mostrando conteúdo de demonstração. Configure o backend para ver seus dados reais.
            </p>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle title="Habilidades" subtitle="Skills" />
        <div className="flex flex-wrap gap-3">
          {displayProfile.skills?.map((skill) => (
            <span key={skill} className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle title="Projetos em destaque" subtitle="Projetos" />
        <div className="grid md:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
