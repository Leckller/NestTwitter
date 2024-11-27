import SinglePost from '../SinglePost/SinglePost';
import { StyledGroupPost } from './Styles/StyledGlobal';
import { PostType } from '../../../types/Post/PostType';

function GroupPost({ posts }: { posts: PostType[] }) {
  return (
    <StyledGroupPost>
      {posts.map((post) => (
        <SinglePost post={post} key={post.id} />
      ))}
    </StyledGroupPost>
  )
}

export default GroupPost;
