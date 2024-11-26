import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPostDetails } from '../../redux/Thunks/Post/PostDetailsThunk';
import SinglePost from '../../components/Posts/SinglePost/SinglePost';
import { StyledPostDetails } from './StyledPostDetails';

function PostDetails() {
  const { id } = useParams();
  const { token } = useAppSelector((s) => s.User);
  const { postDetails } = useAppSelector((s) => s.Post);
  const dispatch = useAppDispatch();

  useEffect(() => {
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
            }}
          />
          {postDetails.postComments.map(({ comment, user }) => (
            <SinglePost
              post={{
                comments: comment.comments,
                id: comment.id,
                isComment: true,
                likes: comment.likes,
                text: comment.text,
                user,
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
