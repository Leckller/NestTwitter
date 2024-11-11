import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchCreatePost } from '../../../redux/Thunks/Post/CreatePostThunk';
import { StyledCreatePost } from './StyledCreatePost';

function CreatePost() {
  const { token } = useAppSelector((s) => s.User);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  return (
    <StyledCreatePost
      onSubmit={ (e) => {
        e.preventDefault();
        dispatch(fetchCreatePost({ authorization: token, text }));
      } }
    >
      <textarea
        placeholder="O que deu na telha?"
        onChange={ ({ target: { value } }) => setText(value) }
      />
      <button type="submit">Postar</button>
    </StyledCreatePost>
  );
}

export default CreatePost;
