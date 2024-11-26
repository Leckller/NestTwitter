import { useEffect } from 'react';
import GroupPost from '../../components/Posts/GroupPost/GroupPost';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { StyledHome } from './StyledHome';
import { StyledSentinel } from '../../components/Posts/GroupPost/Styles/StyledSentintel';
import { setPage } from '../../redux/Reducers/Post';
import { fetchBubblePosts } from '../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../redux/Thunks/Post/GlobalPostsThunk';

function Home() {
  const { localPost, posts, bubblePosts, globalPage, isMaxPage } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  // Observador
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      // Caso seja a pagina não retorne nada então o
      // valor de isMaxPage é dado como true e dxa de incrementar a pagina
      if (isMaxPage) {
        dispatch(setPage(globalPage));
      } else {
        dispatch(setPage(globalPage + 1));
      }
    }
  }, {
    threshold: 0.8,
  });

  useEffect(() => {
    // Caso o usuário não tenha chegado na última página será feito
    // Uma requisição para pegar mais posts
    if (!isMaxPage) {
      if (localPost === 'bubble') {
        dispatch(fetchBubblePosts({ authorization: token, page: globalPage }));
      } else {
        dispatch(fetchGlobalPosts({ authorization: token, page: globalPage }));
      }
    }

    // Seta o observador para ficar olhando para o elemento de id sentinel
    observer.observe(document.querySelector('#sentinel')!);

    return () => observer.disconnect();
  }, [globalPage]);

  return (
    <StyledHome>
      <GroupPost posts={localPost === 'bubble' ? bubblePosts : posts} />
      <StyledSentinel id="sentinel" />
    </StyledHome>
  );
}

export default Home;
