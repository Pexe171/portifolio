import { useEffect, useState } from 'react';
import api from '../api/client.js';

function DashboardPage() {
  const [stats, setStats] = useState({ totalProjects: 0 });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [projectsResponse, profileResponse] = await Promise.all([
          api.get('/api/admin/projects'),
          api.get('/api/admin/profile')
        ]);
        setStats({ totalProjects: projectsResponse.data.length });
        setProfile(profileResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard', error);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Visão geral</h1>
        <p className="text-slate-400 text-sm">Gerencie seu portfólio de maneira simples.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-sm text-slate-400">Projetos publicados</p>
          <p className="text-3xl font-semibold text-white">{stats.totalProjects}</p>
        </div>
        {profile && (
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-2">
            <p className="text-sm text-slate-400">Perfil</p>
            <h2 className="text-xl font-semibold text-white">{profile.fullName}</h2>
            <p className="text-sm text-slate-400">{profile.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
