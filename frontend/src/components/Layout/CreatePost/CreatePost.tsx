import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchCreatePost } from '../../../redux/Thunks/Post/CreatePostThunk';
import { StyledCreatePost } from './StyledCreatePost';
import { setNewPost } from '../../../redux/Reducers/Post';

function CreatePost() {
  const { token } = useAppSelector((s) => s.User);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  return (
    <StyledCreatePost
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          dispatch(setNewPost(false));
        }
      }}
    >
      <article
        onClick={() => dispatch(setNewPost(false))}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(fetchCreatePost({ authorization: token, text }));
        }}
      >
        <section>
          <button onClick={() => dispatch(setNewPost(false))}>x</button>
        </section>
        <textarea
          maxLength={300}
          placeholder="O que deu na telha?"
          onChange={({ target: { value } }) => setText(value)}
        />
        <section>
          <button type="submit">Postar</button>
        </section>
      </form>
    </StyledCreatePost>
  );
}

export default CreatePost;
