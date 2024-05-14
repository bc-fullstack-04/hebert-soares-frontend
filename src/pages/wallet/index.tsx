import { useEffect, useState } from 'react';
import { user_api } from '@/services/apiService';
import Header from '@/components/custom/Header';
import toast from 'react-hot-toast';

export function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState('');

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  const fetchWalletBalance = () => {
    const token = localStorage.getItem('@Auth.Token');
    if (token) {
      user_api.defaults.headers.common.Authorization = `Basic ${token}`;
      user_api.get('/wallet')
        .then(resp => {
          setBalance(resp.data.balance);
        })
        .catch(() => toast.error("Falha ao buscar a carteira")); // Remove 'error'
    }
  };
  
  const addCredits = () => {
    const token = localStorage.getItem('@Auth.Token');
    if (token && amountToAdd) {
      user_api.defaults.headers.common.Authorization = `Basic ${token}`;
      user_api.post(`/wallet/credit/${amountToAdd}`)
        .then(() => {
          fetchWalletBalance();
          toast.success("Créditos adicionados com sucesso!");
          setAmountToAdd('');
        })
        .catch(() => toast.error("Falha ao adicionar créditos")); // Remove 'error'
    }
  };
  

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-10 flex flex-col pt-36">
        <Header className="bg-gray-400"/>
        <h1 className="text-3xl font-semibold mb-6">Carteira</h1>
        <div className="bg-white text-black p-4 rounded-lg shadow flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold">Saldo Atual</h2>
          <p className="text-xl mb-4">R$ {balance.toFixed(2)}</p>
          <div className="flex space-x-4">
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(e.target.value)}
              className="p-2 rounded-lg"
              placeholder="Valor a adicionar"
            />
            <button
              onClick={addCredits}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Adicionar Créditos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
