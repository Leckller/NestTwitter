import { useNavigate } from 'react-router-dom';
import { StyledFooter } from './StyledFooter';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setLocalPosts } from '../../../redux/Reducers/Post';

function Footer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector(s => s.User);

  return (
    <StyledFooter>
      <button onClick={() => {
        dispatch(setLocalPosts('bubble'));
        navigate('/home')
      }}>
        Home
      </button>
      <button onClick={() => {
        dispatch(setLocalPosts('search'));
        navigate('/search')
      }}>
        Search
      </button>
      <button onClick={() => {
        dispatch(setLocalPosts('profile'));
        navigate(`/profile/${userId}`)
      }}>
        Profile
      </button>
    </StyledFooter>
  );
}

export default Footer;
