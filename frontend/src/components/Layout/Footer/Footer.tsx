import { useNavigate } from 'react-router-dom';
import { StyledFooter } from './StyledFooter';

function Footer() {
  const navigate = useNavigate();

  return (
    <StyledFooter>
      <button onClick={ () => navigate('/Home') }>
        Home
      </button>
      <button onClick={ () => navigate('/Global') }>
        Global
      </button>
      <button onClick={ () => navigate('/Search') }>
        Search
      </button>
      <button onClick={ () => navigate('/Profile') }>
        Profile
      </button>
    </StyledFooter>
  );
}

export default Footer;
