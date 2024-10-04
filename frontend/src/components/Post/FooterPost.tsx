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
  );
}

export default FooterPost;
