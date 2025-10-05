import { useEffect, useState } from 'react';
import api from '../api/client.js';
import SectionTitle from '../components/SectionTitle.jsx';

function ContactPage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data } = await api.get('/api/public/profile');
        setProfile(data);
      } catch (error) {
        console.error('Erro ao carregar perfil', error);
      }
    }
    loadProfile();
  }, []);

  if (!profile) {
    return <p className="text-center text-slate-400">Carregando...</p>;
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <SectionTitle title="Entre em contato" subtitle="Contato" />
      <p className="text-slate-300">
        Estou sempre aberto a novas oportunidades, desafios interessantes e bate-papos sobre tecnologia.
      </p>
      <div className="space-y-4">
        {profile.email && (
          <a
            href={`mailto:${profile.email}`}
            className="block px-5 py-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-primary-500"
          >
            <span className="block text-sm text-slate-400">Email</span>
            <span className="text-lg text-white">{profile.email}</span>
          </a>
        )}
        {profile.whatsappUrl && (
          <a
            href={profile.whatsappUrl}
            className="block px-5 py-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-primary-500"
          >
            <span className="block text-sm text-slate-400">WhatsApp</span>
            <span className="text-lg text-white">Converse comigo</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
