import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import LikeConnect from '../../service/Like-Connection.Service';
import { PostType } from '../../types';

function Post({ post }: { post: PostType }) {
  const { token } = useAppSelector((s) => s.User);

  const navigate = useNavigate();

  const handleClick = async () => {
    const likePost = await LikeConnect.likePost(post.id, token);

    if (!likePost.ok) {
      alert('Ops... parece que ocorreu algum erro durante o like');
    }
    
  };

  return (
    <article 
      className={`flex flex-col border-t w-full p-4 post-${post.id}`} 
      style={{backgroundColor: post.bgColor, color: post.textColor}}
    >

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

      <p>
        {post.text}
      </p>

      <article>

        <p className="flex gap-2">

          <button
            onClick={ handleClick }
          >
            Like
          </button>
          {post.likes.length}

        </p>

      </article>

    </article>
  );
}

export default Post;
