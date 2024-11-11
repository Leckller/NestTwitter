import { GlobalPostResponse } from '../../types/Post/GlobalPost.Response';
import { StyledPost } from './StyledPost';
import DefaultImg from '../../../assets/ProfilePictures/iconFace.png';

function Post({ post }: { post: GlobalPostResponse }) {
  const { comments, id, isComment, likes, text, user } = post;
  return (
    <StyledPost>
      <section>
        <img src={user.photo || DefaultImg} alt={user.name} />
      </section>
      <section>
        <article>
          <p>
            {user.name}
          </p>
          <p>
            {`@${user.address}`}
          </p>
        </article>
        <article>
          <p>{text}</p>
        </article>
        <article>
          <p>
            {`Comments: ${comments}`}
          </p>
          <p>
            {`Likes: ${likes}`}
          </p>
        </article>
      </section>
    </StyledPost>
  );
}

export default Post;
