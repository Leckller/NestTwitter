import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { LiaCommentSolid } from 'react-icons/lia';
import DefaultImg from '../../../assets/ProfilePictures/iconFace.png';
import GoToPostDetails from './GoToPostDetails';
import { StyledSinglePost } from './StyledSinglePost';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchLikePost } from '../../../redux/Thunks/Post/LikePostThunk';
import { setComment, setNewPost } from '../../../redux/Reducers/Post';
import { PostType } from '../../../types/Post/PostType';

function SinglePost({ post, borderB = true }: { post: PostType, borderB?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { comments, id, isLiked, likes, text, user, created_at } = post;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((s) => s.User);

  return (
    <StyledSinglePost borderB={ borderB }>
      <section>
        <GoToPostDetails route="profile" id={ user.id }>
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
            <p>
              {`${new Date(created_at).toLocaleDateString()} -
               ${new Date(created_at).toLocaleTimeString()}`}
            </p>
          </article>
          <article>
            <p>{text}</p>
          </article>
        </GoToPostDetails>
        <article>
          <button
            onClick={ () => {
              dispatch(setComment({ isComment: true, postId: id }));
              dispatch(setNewPost(true));
            } }
          >
            <LiaCommentSolid />
            {comments}
          </button>
          <button
            onClick={ () => dispatch(
              fetchLikePost({ authorization: token, postId: id }),
            ) }
          >
            {
              isLiked ? <AiFillLike /> : <AiOutlineLike />
            }
            {likes}
          </button>
        </article>
      </section>
    </StyledSinglePost>
  );
}

export default SinglePost;
