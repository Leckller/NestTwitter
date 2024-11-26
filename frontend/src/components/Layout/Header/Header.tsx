import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setPage } from '../../../redux/Reducers/Post';
import { fetchBubblePosts } from '../../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../../redux/Thunks/Post/GlobalPostsThunk';
import { StyledHeader } from './StyledHeader';

function Header() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);
  const { globalPage } = useAppSelector(s => s.Post);
  const { pathname } = useLocation();

  return (
    <>
      {!pathname.includes('profile') &&
        <StyledHeader>
          <section>
            <button>Twitter</button>
          </section>
          <section>
            <button onClick={() => {
              dispatch(setPage(0));
              dispatch(fetchBubblePosts({ authorization: token, page: globalPage }))
            }}>
              Para você
            </button>
            <button onClick={() => {
              dispatch(setPage(0));
              dispatch(fetchGlobalPosts({ authorization: token, page: globalPage }))
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
