import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { PostType } from '../../types';
import FooterPost from './FooterPost';
import HeaderPost from './HeaderPost';

function Post({ post }: { post: PostType }) {
  const { customColors, user: { textColor, bgColor } } = useAppSelector((s) => s.User);

  const isProfileRoute = useLocation().pathname.includes('profile');

  const backgroundColor = (customColors && !isProfileRoute) ? bgColor : post.bgColor;

  const color = (customColors && !isProfileRoute) ? textColor : post.textColor;

  return (
    <article
      className={ `flex flex-col border-t w-full p-4 post-${post.id} transition-all` }
      style={ { backgroundColor, color } }
    >

      <HeaderPost post={ post } />

      <p className="break-words">
        {post.text}
      </p>

      <FooterPost post={ post } />

    </article>
  );
}

export default Post;
