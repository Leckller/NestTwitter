import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import DefaultImg from '../../../assets/ProfilePictures/iconFace.png';
import GoToPostDetails from './GoToPostDetails';
import { StyledSinglePost } from './StyledSinglePost';
import { LiaCommentSolid } from 'react-icons/lia';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchLikePost } from '../../../redux/Thunks/Post/LikePostThunk';
import { setComment, setNewPost } from '../../../redux/Reducers/Post';
import { PostType } from '../../../types/Post/PostType';

function SinglePost({ post }: { post: PostType }) {
  const { comments, id, isLiked, likes, text, user } = post;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(s => s.User);

  return (
    <StyledSinglePost>
      <section>
        <GoToPostDetails route='profile' id={user.id}>
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
          <button onClick={() => {
            dispatch(setComment({ isComment: true, postId: id }));
            dispatch(setNewPost(true));
          }}>
            <LiaCommentSolid />
            {comments}
          </button>
          <button onClick={() => dispatch(fetchLikePost({ authorization: token, postId: id }))}>
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
