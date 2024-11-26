import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPostDetails } from '../../redux/Thunks/Post/PostDetailsThunk';
import SinglePost from '../../components/Posts/SinglePost/SinglePost';
import { StyledPostDetails } from './StyledPostDetails';
import { setLocalPosts } from '../../redux/Reducers/Post';

function PostDetails() {
  const { id } = useParams();
  const { token } = useAppSelector((s) => s.User);
  const { postDetails } = useAppSelector((s) => s.Post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLocalPosts('details'));
    dispatch(fetchPostDetails({ id: +id!, authorization: token }));
  }, [id]);

  return (
    <StyledPostDetails>
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
          <article>
            oi
          </article>
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
        </>
      )}
    </StyledPostDetails>
  );
}

export default PostDetails;
