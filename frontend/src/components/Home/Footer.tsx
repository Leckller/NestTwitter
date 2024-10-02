import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const { address } = { address: 'teste' };

  return (
    <footer className="flex w-full items-center justify-center">
      <nav className="w-full max-w-[440px] flex justify-around items-center">
        <button onClick={ () => navigate('/') }>A</button>
        <button onClick={ () => navigate('/search') }>B</button>
        <button onClick={ () => navigate(`/profile/${address}`) }>C</button>
      </nav>
    </footer>
  );
}

export default Footer;
