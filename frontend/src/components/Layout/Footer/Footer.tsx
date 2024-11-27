import { useNavigate } from 'react-router-dom';
import { StyledFooter } from './StyledFooter';
import { useAppSelector } from '../../../hooks/reduxHooks';

function Footer() {
  const navigate = useNavigate();
  const { userId } = useAppSelector(s => s.User);

  return (
    <StyledFooter>
      <button onClick={() => navigate('/Home')}>
        Home
      </button>
      <button onClick={() => navigate('/Search')}>
        Search
      </button>
      <button onClick={() => navigate(`/Profile/${userId}`)}>
        Profile
      </button>
    </StyledFooter>
  );
}

export default Footer;
