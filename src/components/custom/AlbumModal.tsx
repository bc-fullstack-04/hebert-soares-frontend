import { album_api } from "@/services/apiService";
import toast from "react-hot-toast";

function AlbumModal({ album, onClose }) {
  if (!album) return null;

  const artistNames = album.artists.map(artist => artist.name).join(', ');

  const handleBuyAlbum = () => {
    const albumData = {
      name: artistNames,
      idSpotify: album.id,
      artistName: artistNames,
      imageUrl: album.images[0].url,
      value: album.value
    };

    album_api.post('/albums/sale', albumData)
      .then(response => {
        if (response.status === 200) {
          toast.success('Compra realizada com sucesso!');
          onClose();
        } else {
          toast.error('Erro ao processar a compra. Tente novamente mais tarde.');
        }
      })
      .catch(error => {
        toast.error('Erro ao processar a compra. Tente novamente mais tarde.');
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto flex flex-col md:flex-row">
        <img src={album.images[0].url} alt={album.name} className="w-full md:w-1/2 object-cover h-64 md:h-auto rounded-lg mb-4 md:mb-0 md:mr-4"/>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">{album.name}</h2>
            <button onClick={onClose} className="text-xl font-semibold">✕</button>
          </div>
          <p className="text-sm mb-2">Tipo: {album.albumType}</p>
          <p className="text-sm mb-2">Artistas: {artistNames}</p>
          <p className="text-sm mb-4">Lançado em: {album.releaseDate}</p>
          <p className="text-lg mb-4">{`Preço: R$ ${album.value.toFixed(2)}`}</p>

          <button 
            className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded w-full"
            onClick={handleBuyAlbum}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlbumModal;