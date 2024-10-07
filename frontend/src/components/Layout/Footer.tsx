import { FaHome, FaSearch, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';

function Footer() {
  const navigate = useNavigate();
  const { user: { address, textColor }, customColors } = useAppSelector((s) => s.User);

  const color = customColors ? textColor : '';

  return (
    <footer
      className="flex w-full items-center justify-center fixed bottom-0"
      style={ { color, backdropFilter: 'blur(2px)' } }
    >
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
