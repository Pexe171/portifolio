import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const links = [
  { to: '/admin', label: 'Visão geral', end: true },
  { to: '/admin/projects', label: 'Projetos' },
  { to: '/admin/profile', label: 'Perfil' }
];

function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="px-6 py-5 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-primary-500">Portfólio CMS</h2>
        <p className="text-xs text-slate-400">Painel administrativo</p>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-primary-500/10 text-primary-500' : 'text-slate-300 hover:bg-slate-800'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={logout}
        className="m-4 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700"
      >
        Sair
      </button>
    </aside>
  );
}

export default AdminSidebar;
