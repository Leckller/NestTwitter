import { PostType } from '../../types';

function Post({ post }: { post: PostType }) {
  return (
    <article className="flex flex-col border-t w-full p-4">

      <article>
        <img src={ post.user.photo } alt={ post.user.name } />

        <p className="flex gap-2 items-center">

          <strong className="text-lg">

            {post.user.name}

          </strong>

          {post.user.address}
        </p>
      </article>

      <p>
        {post.text}
      </p>

      <article>

        <p>

          {post.likes.length}
          <button onClick={ () => {} }>Like</button>

        </p>

      </article>

    </article>
  );
}

export default Post;
