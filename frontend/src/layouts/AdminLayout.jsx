import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto w-full px-6 py-8 space-y-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
