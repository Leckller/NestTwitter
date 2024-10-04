import { PostType } from '../../types';
import FooterPost from './FooterPost';
import HeaderPost from './HeaderPost';

function Post({ post }: { post: PostType }) {
  return (
    <article
      className={ `flex flex-col border-t w-full p-4 post-${post.id}` }
      style={ { backgroundColor: post.bgColor, color: post.textColor } }
    >

      <HeaderPost post={ post } />

      <p>
        {post.text}
      </p>

      <FooterPost post={ post } />

    </article>
  );
}

export default Post;
