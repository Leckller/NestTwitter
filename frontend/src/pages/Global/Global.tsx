import { useEffect } from 'react';
import { StyledGlobal } from './Styles/StyledGlobal';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchGlobalPosts } from '../../redux/Thunks/Post/GlobalPostsThunk';
import Post from '../../components/Global/Post/Post';
import { setPage } from '../../redux/Reducers/Post';
import { StyledSentinel } from './Styles/StyledSentintel';

function Global() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.User);
  const { posts, globalPage, isMaxPage } = useAppSelector((s) => s.Post);

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
      dispatch(fetchGlobalPosts({ authorization: token, page: globalPage }));
    }

    // Seta o observador para ficar olhando para o elemento de id sentinel
    observer.observe(document.querySelector('#sentinel')!);
  }, [globalPage]);

  return (
    <StyledGlobal>
      <section>
        {posts.map((post) => (
          <Post post={ post } key={ post.id } />
        ))}
        <StyledSentinel id="sentinel" />
      </section>
    </StyledGlobal>
  );
}

export default Global;
