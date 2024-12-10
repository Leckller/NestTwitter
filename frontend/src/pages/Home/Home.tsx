import GroupPost from '../../components/Posts/GroupPost/GroupPost';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { StyledHome } from './StyledHome';
import { fetchBubblePosts } from '../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../redux/Thunks/Post/GlobalPostsThunk';
import { useEffect } from 'react';
import MorePosts from '../../components/Posts/MorePosts/MorePosts';
import { setLocalPosts } from '../../redux/Reducers/Post';

function Home() {
  const { localPost, posts, bubblePosts, pages } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Garantia que caso reinicie a página vai realizar o fetch correto
    if (localPost != 'bubble' && localPost != 'global') {
      dispatch(setLocalPosts('bubble'));
      dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }));
    }
    if (localPost === 'bubble' && bubblePosts.length <= 0) {
      dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }));
      return
    } else if (localPost === 'global' && posts.length <= 0) {
      dispatch(fetchGlobalPosts({ authorization: token, page: pages.global }));
      return;
    }
  }, [])

  return (
    <StyledHome>
      <GroupPost posts={localPost === 'bubble' ? bubblePosts : posts} />
      {((localPost === 'bubble' && bubblePosts.length > 0) || posts.length > 0) && (
        <MorePosts />
      )}
    </StyledHome>
  );
}

export default Home;
