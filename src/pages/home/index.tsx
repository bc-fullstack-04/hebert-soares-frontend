import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

export function HomePage() {
  return (
    <div className="bg-fundo bg-cover bg-no-repeat h-screen">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col justify-center items-start pl-20">
        <header className="absolute top-0 left-0 right-0 p-5 flex justify-between items-center w-full text-white backdrop-blur-lg">
          <div className="flex items-center">
            <img src={logo} alt="BootPlay Logo" className="h-12 rounded-full" />
            <span className="ml-2 font-medium">BootPlay</span>
          </div>
          <div className="flex">
            <Link to="/login" className="px-6 py-2 mr-4 rounded bg-[#010B0F] hover:bg-opacity-80 transition">Entrar</Link>
            <Link to="/signup" className="px-6 py-2 rounded bg-[#9EE2FF] hover:bg-opacity-80 transition text-black">Inscrever-se</Link>
          </div>
        </header>
        <div className="text-left">
          <h1 className="text-white text-6xl font-semibold leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif', width: '701px' }}>A história da música não pode ser esquecida!</h1>
          <p className="text-xl text-white mb-6">Crie já sua conta e curta os sucessos que marcaram os tempos no Vinil.</p>
          <Link to="/signup" className="inline-block bg-[#9EE2FF] text-black py-2 px-4 rounded hover:bg-[#82c5e5] transition">Inscrever-se</Link>
        </div>
      </div>
    </div>
  );
}
