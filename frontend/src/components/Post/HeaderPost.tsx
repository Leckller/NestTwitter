import { useNavigate } from 'react-router-dom';
import { PostType } from '../../types';

function HeaderPost({ post }: { post: PostType }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={ () => navigate(`/profile/${post.user.address}`) }
      className="flex items-center justify-start gap-2"
    >
      <img
        className="size-12 rounded-full border object-contain"
        src={ post.user.photo }
        alt="profile"
      />

      <p className="flex gap-2 items-center opacity-85">

        <strong className="text-lg">

          {post.user.name}

        </strong>

        {post.user.address}
      </p>

    </button>
  );
}

export default HeaderPost;