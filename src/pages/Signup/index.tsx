import { FormEvent, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Input2 } from '@/components/custom/Input';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { user_api } from '../../services/apiService';
import { useNavigate, Link } from 'react-router-dom';

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(event: FormEvent) {
    event.preventDefault();
    if (!name || !email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    const toastId = toast.loading("Criando conta...");

    try {
      await user_api.post("users/create", { name, email, password });
      toast.dismiss(toastId);
      toast.success("Conta criada com sucesso!");
      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("Erro ao criar a conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-fundo bg-cover bg-no-repeat h-screen">
      <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
        <div className="flex max-w-[544px] bg-white p-10 rounded-md">
          <div className="flex flex-col items-center w-full gap-2">
            <img src={logo} alt="Logo" className="h-12" />
            <h1 className="text-xl font-semibold">Criar conta</h1>
            <form onSubmit={handleSignup} className="flex flex-col w-72">
              <Input2 onChange={e => setName(e.target.value)} type='text'>Nome:</Input2>
              <Input2 onChange={e => setEmail(e.target.value)} type='email'>Email:</Input2>
              <Input2 onChange={e => setPassword(e.target.value)} type='password'>Senha:</Input2>
              <Button
                type='submit'
                className="p-3 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-3"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Criar conta'}
              </Button>
            </form>
            <p className="text-xs font-light">
              Já tem uma conta? <Link to="/login" className="font-semibold underline">Entrar</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
