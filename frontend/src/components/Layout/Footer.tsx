import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

function Footer() {
  const navigate = useNavigate();
  const { address } = useAppSelector((s) => s.User.user);

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
