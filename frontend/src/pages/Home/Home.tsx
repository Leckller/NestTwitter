import GroupPost from '../../components/Posts/GroupPost/GroupPost';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { StyledHome } from './StyledHome';
import { fetchBubblePosts } from '../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../redux/Thunks/Post/GlobalPostsThunk';
import { useEffect } from 'react';
import { setPage } from '../../redux/Reducers/Post';

function Home() {
  const { localPost, posts, bubblePosts, globalPage, isMaxPage } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isMaxPage) {
      if (localPost === 'bubble') {
        dispatch(fetchBubblePosts({ authorization: token, page: globalPage }));
      } else {
        dispatch(fetchGlobalPosts({ authorization: token, page: globalPage }));
      }
      dispatch(setPage(globalPage + 1))
    }
  }, [])

  return (
    <StyledHome>
      <GroupPost posts={localPost === 'bubble' ? bubblePosts : posts} />
      <button onClick={() => {
        // Caso o usuário não tenha chegado na última página será feito
        // Uma requisição para pegar mais posts
        if (!isMaxPage) {
          if (localPost === 'bubble') {
            dispatch(fetchBubblePosts({ authorization: token, page: globalPage }));
          } else {
            dispatch(fetchGlobalPosts({ authorization: token, page: globalPage }));
          }
          dispatch(setPage(globalPage + 1))
        }
      }}>
        Mais postagens
      </button>
    </StyledHome>
  );
}

export default Home;
