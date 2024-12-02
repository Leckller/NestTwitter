import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setLocalPosts } from '../../../redux/Reducers/Post';
import { fetchBubblePosts } from '../../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../../redux/Thunks/Post/GlobalPostsThunk';
import { StyledHeader } from './StyledHeader';
import { FaGear } from 'react-icons/fa6';

function Header() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);
  const { pages, localPost, bubblePosts, posts } = useAppSelector(s => s.Post);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {(pathname.includes('home') || pathname === '/') &&
        <StyledHeader isBubble={localPost}>
          <section>
            <button>Twitter</button>
            <button onClick={() => navigate('/config')}>
              <FaGear />
            </button>
          </section>
          <section>
            <button onClick={() => {
              dispatch(setLocalPosts('global'));
              if (posts.length <= 0) {
                dispatch(fetchGlobalPosts({ authorization: token, page: pages.global }))
              }
            }}>
              Para você
            </button>
            <button onClick={() => {
              dispatch(setLocalPosts('bubble'));
              if (bubblePosts.length <= 0) {
                dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }))
              }
            }}>
              Seguindo
            </button>
          </section>
        </StyledHeader>
      }
    </>
  );
}

export default Header;
