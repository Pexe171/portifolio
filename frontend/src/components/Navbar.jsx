import { Link, NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Início' },
  { to: '/projects', label: 'Projetos' },
  { to: '/contact', label: 'Contato' }
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-primary-500">
          Portfólio CMS
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm uppercase tracking-wide ${isActive ? 'text-primary-500' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden text-slate-200"
          aria-label="Abrir menu"
        >
          {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block text-sm uppercase tracking-wide ${isActive ? 'text-primary-500' : 'text-slate-300 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
