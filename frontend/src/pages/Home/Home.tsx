import GroupPost from '../../components/Posts/GroupPost/GroupPost';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { StyledHome } from './StyledHome';
import { fetchBubblePosts } from '../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../redux/Thunks/Post/GlobalPostsThunk';
import { useEffect } from 'react';
import { setPage } from '../../redux/Reducers/Post';
import MorePosts from '../../components/Posts/MorePosts/MorePosts';

function Home() {
  const { localPost, posts, bubblePosts, pages } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localPost === 'bubble') {
      dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }));
    } else {
      dispatch(fetchGlobalPosts({ authorization: token, page: pages.global }));
    }
    dispatch(setPage({ type: localPost, page: pages[localPost] + 1 }))
  }, [])

  return (
    <StyledHome>
      <GroupPost posts={localPost === 'bubble' ? bubblePosts : posts} />
      <MorePosts />
    </StyledHome>
  );
}

export default Home;
