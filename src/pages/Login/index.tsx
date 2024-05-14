import { FormEvent, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Input2 } from '@/components/custom/Input';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const _navigate = useNavigate();


  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    await login(email, password).then(() =>{
      _navigate('/lading');
    }).catch(() =>{
      toast.error("Erro ao efetuar o login!")
    })
    
    
  }

  return (
    <>
      {isAuthenticated && <Navigate to='/lading' />}
        <div className="bg-fundo bg-cover bg-no-repeat h-screen">
          <div className="flex items-center justify-center h-screen backdrop-brightness-50 backdrop-blur-sm">
            <div className="flex max-w-[544px] bg-white p-10 rounded-md">
              <div className="flex flex-col items-center w-full gap-2">
                <img src={logo} alt="Logo" className="h-12" />
                <h1 className="text-xl font-semibold">Acesse sua conta</h1>
                <form onSubmit={handleLogin} className="flex flex-col w-72">
                  <Input2 onChange={e => setEmail(e.target.value)} type="email">Email:</Input2>
                  <Input2 onChange={e => setPassword(e.target.value)} type="password">Senha:</Input2>
                  <button type="submit" className="p-3 bg-zinc-900 text-white hover:bg-zinc-900/90 transition mb-3">Entrar</button>
                </form>
                <p className="text-xs font-light">
                  Ainda não tem conta ? <a href="/signup" className="font-semibold underline">Inscrever-se</a>
                </p>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
