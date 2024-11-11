import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPostDetails } from '../../redux/Thunks/Post/PostDetailsThunk';

function PostDetails() {
  const { id } = useParams();
  const { token } = useAppSelector((s) => s.User);
  const { postDetails } = useAppSelector((s) => s.Post);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPostDetails({ id: +id!, authorization: token, page: 0 }));
  }, []);

  return (
    <div>PostDetails</div>
  );
}

export default PostDetails;
