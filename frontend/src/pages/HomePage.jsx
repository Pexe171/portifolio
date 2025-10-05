import { useEffect, useState } from 'react';
import api from '../api/client.js';
import SectionTitle from '../components/SectionTitle.jsx';
import ProjectCard from '../components/ProjectCard.jsx';

function HomePage() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileResponse, projectsResponse] = await Promise.all([
          api.get('/api/public/profile'),
          api.get('/api/public/projects')
        ]);
        setProfile(profileResponse.data);
        setProjects(projectsResponse.data.slice(0, 3));
      } catch (error) {
        console.error('Erro ao carregar dados', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <p className="text-center text-slate-400">Carregando...</p>;
  }

  if (!profile) {
    return <p className="text-center text-slate-400">Perfil não configurado ainda.</p>;
  }

  return (
    <div className="space-y-16">
      <section className="flex flex-col md:flex-row items-center gap-10">
        <img
          src={profile.photoUrl}
          alt={profile.fullName}
          className="w-40 h-40 rounded-full object-cover border-4 border-primary-500 shadow-lg"
        />
        <div className="space-y-4">
          <p className="uppercase text-xs tracking-[0.35em] text-primary-500">Bem-vindo</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{profile.fullName}</h1>
          <p className="text-lg text-slate-300">{profile.role}</p>
          <p className="text-slate-400 max-w-2xl">{profile.bio}</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            {profile.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
            {profile.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {profile.email && <a href={`mailto:${profile.email}`}>Email</a>}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle title="Habilidades" subtitle="Skills" />
        <div className="flex flex-wrap gap-3">
          {profile.skills?.map((skill) => (
            <span key={skill} className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle title="Projetos em destaque" subtitle="Projetos" />
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
