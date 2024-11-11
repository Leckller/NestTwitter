import DefaultImg from '../../../assets/ProfilePictures/iconFace.png';
import { GlobalPostResponse } from '../../../types/Post/GlobalPost.Response';
import GoToPostDetails from './GoToPostDetails';
import { StyledSinglePost } from './StyledSinglePost';

function SinglePost({ post }: { post: GlobalPostResponse }) {
  const { comments, id, isComment, likes, text, user } = post;
  return (
    <StyledSinglePost>
      <section>
        <GoToPostDetails id={ id }>
          <img src={ user.photo || DefaultImg } alt={ user.name } />
        </GoToPostDetails>
      </section>
      <section>
        <GoToPostDetails id={ id }>
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
        </GoToPostDetails>
        <article>
          <p>
            {`Comments: ${comments}`}
          </p>
          <p>
            {`Likes: ${likes}`}
          </p>
        </article>
      </section>
    </StyledSinglePost>
  );
}

export default SinglePost;
