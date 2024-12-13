import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPostDetails } from '../../redux/Thunks/Post/PostDetailsThunk';
import SinglePost from '../../components/Posts/SinglePost/SinglePost';
import { StyledPostDetails } from './StyledPostDetails';
import { setComment, setLocalPosts, setNewPost, setPage } from '../../redux/Reducers/Post';
import MorePosts from '../../components/Posts/MorePosts/MorePosts';
import { fetchCreateComment } from '../../redux/Thunks/Post/CreateCommentThunk';

function PostDetails() {
  const { id } = useParams();
  const { token } = useAppSelector((s) => s.User);
  const { postDetails } = useAppSelector((s) => s.Post);
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  // useState para o comentário
  const [isClicked, setIsClicked] = useState(false);


  useEffect(() => {
    dispatch(setLocalPosts('details'));
    dispatch(setPage({ type: 'details', page: 0 }));
    dispatch(fetchPostDetails({ id: +id!, authorization: token }));

    // Ajusta para o tamanho do conteúdo do text area
    const textarea = document.getElementById('autoResize');
    textarea?.addEventListener('input', () => {
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, [id]);

  return (
    <StyledPostDetails
      isClicked={isClicked}
    >
      {postDetails && (
        <>
          <SinglePost
            post={{
              comments: postDetails.comments,
              id: postDetails.id,
              likes: postDetails.likes,
              text: postDetails.text,
              isComment: false,
              user: postDetails.user,
              created_at: postDetails.created_at,
              isLiked: postDetails.isLiked
            }}
          />

          <form
            id='commentForm'
            onFocus={() => setIsClicked(true)}
            onSubmit={(e) => {
              e.preventDefault();
              setText('');
            }}
          >
            <textarea
              maxLength={300}
              id='autoResize'
              value={text}
              minLength={1}
              placeholder="Postar sua resposta"
              onChange={({ target: { value } }) => setText(value)}
            />
            <button
              disabled={text.length < 1}
              onClick={() => {
                if (text.length < 1) return;
                dispatch(fetchCreateComment({
                  authorization: token, text, postId: postDetails.id
                }));
              }}>
              Responder
            </button>
          </form>

          {postDetails.postComments.map(({ comment, user }) => (
            <SinglePost
              post={{
                comments: comment.comments,
                id: comment.id,
                isComment: true,
                likes: comment.likes,
                text: comment.text,
                user,
                created_at: comment.created_at,
                isLiked: comment.isLiked
              }}
              key={comment.id}
            />
          ))}
          <MorePosts postId={postDetails.id} />
        </>
      )}
    </StyledPostDetails>
  );
}

export default PostDetails;
