import { FaRegHeart } from 'react-icons/fa';
import { useAppSelector } from '../../hooks/reduxHooks';
import LikeConnect from '../../service/Like-Connection.Service';
import { PostType } from '../../types';

function FooterPost({ post }: { post: PostType }) {
  const { token } = useAppSelector((s) => s.User);

  const handleClick = async () => {
    try {
      const likePost = await LikeConnect.likePost(post.id, token);

      if (!likePost.ok) {
        alert('Ops... parece que ocorreu algum erro durante o like');
      }
    } catch {
      alert('Ops... parece que ocorreu algum erro durante o like');
    }
  };

  return (
    <article className="flex justify-around">

      <p className="flex gap-2">

        <button
          onClick={ handleClick }
        >
          <FaRegHeart />
        </button>
        {post.likes.length}

      </p>

      <button>
        ...
      </button>

    </article>
  );
}

export default FooterPost;
