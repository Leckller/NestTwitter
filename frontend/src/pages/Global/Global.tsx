import { useEffect } from 'react';
import { StyledGlobal } from './Styles/StyledGlobal';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchGlobalPosts } from '../../redux/Thunks/Post/GlobalPostsThunk';
import Post from '../../components/Global/Post/Post';

function Global() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.User);
  const { posts } = useAppSelector((s) => s.Post);

  useEffect(() => {
    dispatch(fetchGlobalPosts({ authorization: token, page: 0 }));
  }, []);

  return (
    <StyledGlobal>
      {posts.map((post) => (
        <Post post={ post } key={ post.id } />
      ))}
    </StyledGlobal>
  );
}

export default Global;
