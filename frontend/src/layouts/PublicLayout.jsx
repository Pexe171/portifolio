import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
