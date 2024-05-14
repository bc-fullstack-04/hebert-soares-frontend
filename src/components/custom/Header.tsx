import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

type HeaderProps = {
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useContext(AuthContext); 

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  return (
    <header className={`absolute top-0 left-0 right-0 p-5 flex justify-between items-center w-full text-white ${className}`}>
      <div className="flex items-center">
        <img src={logo} alt="BootPlay Logo" className="h-12 rounded-full" />
        <span className="ml-2 font-medium">BootPlay</span>
      </div>
      <div className="flex items-center">
        <Link to="/my-albums" className="text-white hover:underline transition mr-4">Meus Discos</Link>
        <Link to="/wallet" className="text-white hover:underline transition">Carteira</Link>
        <div className="ml-4 w-8 h-8 bg-blue-500 rounded-full flex justify-center items-center cursor-pointer"
             onClick={() => setShowDropdown(!showDropdown)}>
          <span className="text-white text-xl">👤</span>
        </div>
        {showDropdown && (
          <div className="absolute right-5 mt-12 bg-white text-black rounded shadow-md py-2 w-48">
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
