import { useEffect, useState, useRef } from 'react';
import { AlbumModel } from '@/models/AlbumModel';
import { album_api } from '@/services/apiService';
import AlbumModal from '../../components/custom/AlbumModal';
import Header from '@/components/custom/Header';
import './landing.css';

export function Landing() {
  const [albums, setAlbums] = useState<AlbumModel[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumModel | null>(null);
  const slideInterval = useRef<number | undefined>(undefined);
  const [viewMode, setViewMode] = useState('carousel'); 

  useEffect(() => {
    const token = localStorage.getItem('@Auth.Token');
    if (token) {
      album_api.defaults.headers.common.Authorization = `Basic ${token}`;
      fetchAlbums('rock');
      startSlideshow();
    }
  
    return () => {
      if (slideInterval.current !== undefined) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  const fetchAlbums = (query: string) => {
    album_api.get(`/albums/all?searchText=${query}`)
      .then(resp => {
        setAlbums(resp.data);
        setViewMode(query !== 'rock' ? 'list' : 'carousel');
      });
  };

  const handleSearch = () => {
    fetchAlbums(searchTerm.trim()); 
  };

  const startSlideshow = () => {
    slideInterval.current = window.setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const pauseSlideshow = () => {
    if (slideInterval.current !== undefined) {
      clearInterval(slideInterval.current);
      slideInterval.current = undefined;
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(albums.length / 4));
  };

  const openModal = (album: AlbumModel) => {
    setSelectedAlbum(album);
  };

  const closeModal = () => {
    setSelectedAlbum(null);
  };

  return (
    <div className="min-h-screen">
      <div className="bg-album bg-cover bg-no-repeat pt-52 pb-64" style={{ minHeight: '50vh', position: 'relative' }}>
          <Header className='backdrop-blur-lg'/>
          <div className="text-left text-white pl-20">
            <h1 className="text-6xl font-semibold leading-tight mb-6" style={{ fontFamily: 'Poppins, sans-serif', width: '701px' }}>A história da música não pode ser esquecida!</h1>
            <p className='text-1xl'>Sucessos que marcaram o tempo!!!</p>
          </div>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            backgroundImage: 'linear-gradient(to bottom, transparent, #000)',
          }}></div>
        </div>
        <div className="bg-black flex flex-col items-center justify-center pt-10 pb-20 px-20">
    <div className="relative w-full max-w-screen-md">
      <input
        type="text"
        className="w-full py-2 pl-4 pr-12 rounded-full bg-white/20 backdrop-blur-lg text-white"
        placeholder="Pesquise seu álbum..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out rounded-full p-2"
        onClick={handleSearch}
      >
        🔍
      </button>
    </div>
    {viewMode === 'carousel' && (
      <div className="w-full text-left pl-20">
        <h2 className="text-3xl font-semibold text-white mt-4">Trends</h2>
      </div>
    )}
    <main className="w-full flex flex-col items-center justify-center mt-10 gap-4">
      {viewMode === 'carousel' ? (
        <div className="relative w-full max-w-screen-xl overflow-hidden"
            onMouseEnter={pauseSlideshow} onMouseLeave={startSlideshow}>
          <div className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {albums.map((album, index) => (
              <div key={index} className="flex-none w-1/4 h-96 bg-cover bg-center text-white rounded-lg shadow-xl mx-2 cursor-pointer"
                  style={{ backgroundImage: `url(${album.images[0].url})` }}
                  onClick={() => openModal(album)}>
                <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-end p-4">
                  <h2 className="text-2xl font-bold">{album.name}</h2>
                  <p className="text-lg">{`R$ ${album.value}`}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <main className="w-full flex flex-wrap justify-center">
        {albums.map((album, index) => (
          <div key={index} className="flex-none w-1/5 m-4 cursor-pointer">
          <div className="bg-cover bg-center h-96 rounded-lg shadow-xl" 
               style={{ backgroundImage: `url(${album.images[0].url})` }}
               onClick={() => openModal(album)}>
              <div className="bg-black bg-opacity-70 w-full h-full flex flex-col justify-end p-4 rounded-lg">
                <h2 className="text-2xl font-bold text-white">{album.name}</h2>
                <p className="text-lg text-white">{`R$ ${album.value}`}</p>
              </div>
            </div>
          </div>
        ))}
      </main>
      )}
    </main>
  </div>
  {selectedAlbum && <AlbumModal album={selectedAlbum} onClose={closeModal} />}
  </div>
    );
}
export default Landing;