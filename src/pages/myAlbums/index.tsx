import { useEffect, useState } from 'react';
import { album_api } from '@/services/apiService';
import Header from '@/components/custom/Header';
import toast from 'react-hot-toast';

interface AlbumModel {
  value: number;
  imageUrl: string;
  name: string;
}

export function MyAlbums() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]); // Provide type annotation for albums

  useEffect(() => {
    const token = localStorage.getItem('@Auth.Token');
    if (token) {
      album_api.defaults.headers.common.Authorization = `Basic ${token}`;
      fetchAlbums();
    }
  }, []);

  const fetchAlbums = () => {
    album_api.get('/albums/my-collection')
      .then(resp => {
        setAlbums(resp.data);
      })
      .catch(error => toast.error("Falha ao buscar os álbuns:", error));
  };

  const totalInvested = albums.reduce((sum, album) => sum + album.value, 0);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-10 flex flex-col pt-36">
      <Header className="bg-gray-400"/>
        <h1 className="text-3xl font-semibold mb-6">Meus Discos</h1>
        <div className="flex justify-start mb-10 gap-4">
          <div className="bg-white text-black p-4 rounded-lg shadow flex items-center">
            <span className="icon text-lg mr-2">📀</span>
            <div>
              <h2>Total de Álbuns</h2>
              <p className=''>{albums.length}</p>
            </div>
          </div>
          <div className="bg-white text-black p-4 rounded-lg shadow flex items-center">
            <span className="icon text-lg mr-2">💰</span>
            <div>
              <h2>Valor Investido</h2>
              <p>R$ {totalInvested.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
        {albums.map((album, index) => (
          <div key={index} className="flex-none w-1/4 h-96 bg-cover bg-center text-white rounded-lg shadow-xl mx-2"
              style={{ backgroundImage: `url(${album.imageUrl})` }}
              >
            <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-end p-4">
              <h2 className="text-xl font-bold">{album.name}</h2>
              <p className="text-lg">{`R$ ${album.value}`}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

export default MyAlbums;
