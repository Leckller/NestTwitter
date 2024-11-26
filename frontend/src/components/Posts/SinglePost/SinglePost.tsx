import { AiOutlineLike } from 'react-icons/ai';
import DefaultImg from '../../../assets/ProfilePictures/iconFace.png';
import { GlobalPostResponse } from '../../../types/Post/GlobalPost.Response';
import GoToPostDetails from './GoToPostDetails';
import { StyledSinglePost } from './StyledSinglePost';
import { LiaCommentSolid } from 'react-icons/lia';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchLikePost } from '../../../redux/Thunks/Post/LikePostThunk';

function SinglePost({ post }: { post: GlobalPostResponse }) {
  const { comments, id, isComment, likes, text, user } = post;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);

  return (
    <StyledSinglePost>
      <section>
        <GoToPostDetails route='profile' id={id}>
          <img src={user.photo || DefaultImg} alt={user.name} />
        </GoToPostDetails>
      </section>
      <section>
        <GoToPostDetails id={id}>
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
          <button>
            <LiaCommentSolid />
            {comments}
          </button>
          <button onClick={() => dispatch(fetchLikePost({ authorization: token, postId: id }))}>
            <AiOutlineLike />
            {likes}
          </button>
        </article>
      </section>
    </StyledSinglePost>
  );
}

export default SinglePost;
