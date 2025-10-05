import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/client.js';

const defaultValues = {
  title: '',
  description: '',
  projectUrl: '',
  repositoryUrl: '',
  imageUrl: '',
  publicVisible: true
};

function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues });

  const loadProjects = async () => {
    const { data } = await api.get('/api/admin/projects');
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (editingProject) {
        await api.put(`/api/admin/projects/${editingProject.id}`, values);
      } else {
        await api.post('/api/admin/projects', values);
      }
      reset(defaultValues);
      setEditingProject(null);
      await loadProjects();
    } catch (error) {
      alert('Erro ao salvar o projeto.');
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    reset(project);
  };

  const handleDelete = async (id) => {
    if (confirm('Deseja remover este projeto?')) {
      await api.delete(`/api/admin/projects/${id}`);
      await loadProjects();
    }
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await api.post('/api/admin/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setValue('imageUrl', data.url);
    } catch (error) {
      alert('Erro ao enviar imagem');
    }
  };

  const handleCancelEdit = () => {
    reset(defaultValues);
    setEditingProject(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projetos</h1>
          <p className="text-sm text-slate-400">Gerencie os projetos exibidos no portfólio.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white">
          {editingProject ? 'Editar projeto' : 'Novo projeto'}
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Título</label>
            <input
              type="text"
              {...register('title', { required: 'Informe o título' })}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
            {errors.title && <p className="text-xs text-red-400">{errors.title.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">URL do projeto</label>
            <input
              type="url"
              {...register('projectUrl')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Repositório</label>
            <input
              type="url"
              {...register('repositoryUrl')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Imagem</label>
            <div className="flex gap-3">
              <input
                type="url"
                {...register('imageUrl')}
                className="flex-1 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="text-sm text-slate-300"
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Descrição</label>
          <textarea
            rows="5"
            {...register('description', { required: 'Informe a descrição' })}
            className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
          />
          {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" {...register('publicVisible')} id="publicVisible" className="h-4 w-4" />
          <label htmlFor="publicVisible" className="text-sm text-slate-300">
            Visível publicamente
          </label>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold disabled:opacity-50"
          >
            {editingProject ? 'Atualizar' : 'Criar'}
          </button>
          {editingProject && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Projetos cadastrados</h2>
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-2 max-w-2xl">{project.description}</p>
                <p className="text-xs text-slate-500 mt-2">
                  {project.publicVisible ? 'Visível publicamente' : 'Oculto'}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 text-sm"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProjectsPage;
