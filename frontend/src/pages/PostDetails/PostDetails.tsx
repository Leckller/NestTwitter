import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPostDetails } from '../../redux/Thunks/Post/PostDetailsThunk';
import SinglePost from '../../components/Posts/SinglePost/SinglePost';

function PostDetails() {
  const { id } = useParams();
  const { token } = useAppSelector((s) => s.User);
  const { postDetails } = useAppSelector((s) => s.Post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostDetails({ id: +id!, authorization: token, page: 0 }));
  }, []);

  return (
    <section>
      {postDetails && (
        <>
          <SinglePost
            post={ {
              comments: 0,
              id: postDetails?.id,
              likes: postDetails?.countLikes,
              text: postDetails?.text,
              isComment: false,
              user: postDetails?.user,
            } }
          />
          {postDetails?.comments.map((comment) => (
            <SinglePost
              post={ {
                comments: 0,
                id: comment.comment.id,
                isComment: true,
                likes: 0,
                text: comment.comment.text,
                user: comment.user,
              } }
              key={ comment.id }
            />
          ))}
        </>
      )}
    </section>
  );
}

export default PostDetails;
