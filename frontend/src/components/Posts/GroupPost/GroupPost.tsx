import SinglePost from '../SinglePost/SinglePost';
import { StyledGroupPost } from './Styles/StyledGlobal';
import { PostType } from '../../../types/Post/PostType';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchBubblePosts } from '../../../redux/Thunks/Post/BubblePostsThunk';
import { fetchGlobalPosts } from '../../../redux/Thunks/Post/GlobalPostsThunk';
import { setPage } from '../../../redux/Reducers/Post';

function GroupPost({ posts }: { posts: PostType[] }) {
  const { localPost, pages } = useAppSelector(s => s.Post);
  const { token } = useAppSelector((s) => s.User);
  const dispatch = useAppDispatch();

  return (
    <StyledGroupPost>
      {posts.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
      <button onClick={() => {
        if (localPost === 'bubble') {
          dispatch(fetchBubblePosts({ authorization: token, page: pages.bubble }));
        } else {
          dispatch(fetchGlobalPosts({ authorization: token, page: pages.global }));
        }
        dispatch(setPage({ type: localPost, page: pages[localPost] + 1 }))
      }}>
        Mais postagens
      </button>
    </StyledGroupPost>
  )
}

export default GroupPost;
