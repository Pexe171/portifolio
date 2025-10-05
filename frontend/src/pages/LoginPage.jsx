import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  const { login } = useAuth();

  const onSubmit = async (values) => {
    try {
      await login(values);
    } catch (error) {
      alert('Não foi possível autenticar. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-900 border border-slate-800 rounded-xl p-8 w-full max-w-md space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-white">Acessar painel</h1>
          <p className="text-sm text-slate-400">Faça login para gerenciar seu portfólio.</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Usuário</label>
          <input
            type="text"
            {...register('username', { required: 'Informe o usuário' })}
            className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
          />
          {errors.username && <p className="text-xs text-red-400">{errors.username.message}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-slate-300">Senha</label>
          <input
            type="password"
            {...register('password', { required: 'Informe a senha' })}
            className="w-full px-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-primary-500 focus:outline-none"
          />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
