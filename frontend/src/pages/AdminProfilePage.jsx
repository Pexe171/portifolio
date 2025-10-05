import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import api from '../api/client.js';

const defaultValues = {
  fullName: '',
  role: '',
  bio: '',
  email: '',
  githubUrl: '',
  linkedinUrl: '',
  whatsappUrl: '',
  photoUrl: '',
  theme: 'dark',
  skills: [{ value: '' }]
};

function AdminProfilePage() {
  const [loading, setLoading] = useState(true);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues });
  const { fields, append, remove } = useFieldArray({ control, name: 'skills' });

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data } = await api.get('/api/admin/profile');
        reset({
          ...data,
          skills: data.skills?.length ? data.skills.map((skill) => ({ value: skill })) : [{ value: '' }]
        });
      } catch (error) {
        console.error('Erro ao carregar perfil', error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [reset]);

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      skills: values.skills.map((item) => item.value).filter(Boolean)
    };
    try {
      await api.put('/api/admin/profile', payload);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil');
    }
  };

  if (loading) {
    return <p className="text-center text-slate-400">Carregando...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Perfil</h1>
        <p className="text-sm text-slate-400">Atualize suas informações públicas.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Nome completo</label>
            <input
              type="text"
              {...register('fullName', { required: 'Informe o nome' })}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
            {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Cargo</label>
            <input
              type="text"
              {...register('role', { required: 'Informe o cargo' })}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
            {errors.role && <p className="text-xs text-red-400">{errors.role.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Email</label>
            <input
              type="email"
              {...register('email')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Foto (URL)</label>
            <input
              type="url"
              {...register('photoUrl')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">GitHub</label>
            <input
              type="url"
              {...register('githubUrl')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">LinkedIn</label>
            <input
              type="url"
              {...register('linkedinUrl')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">WhatsApp / Contato</label>
            <input
              type="url"
              {...register('whatsappUrl')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-slate-300">Tema</label>
            <select
              {...register('theme')}
              className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Bio</label>
          <textarea
            rows="5"
            {...register('bio', { required: 'Informe a bio' })}
            className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
          />
          {errors.bio && <p className="text-xs text-red-400">{errors.bio.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Habilidades</label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-3">
                <input
                  type="text"
                  {...register(`skills.${index}.value`)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
                  placeholder="Digite uma habilidade"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ value: '' })}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              Adicionar habilidade
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold disabled:opacity-50"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

export default AdminProfilePage;
