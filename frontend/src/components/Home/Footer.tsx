import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const { address } = { address: 'teste' };

  return (
    <footer className="flex w-full items-center justify-center">
      <nav className="w-full max-w-[440px] p-3 flex justify-around items-center">
        <button onClick={ () => navigate('/') }>
          <FaHome />
        </button>
        <button onClick={ () => navigate('/search') }>
          <FaSearch />
        </button>
        <button onClick={ () => navigate(`/profile/${address}`) }>
          <FaUser />
        </button>
      </nav>
    </footer>
  );
}

export default Footer;
