import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { fetchCreatePost } from '../../../redux/Thunks/Post/CreatePostThunk';
import { StyledCreatePost } from './StyledCreatePost';
import { setComment, setNewPost } from '../../../redux/Reducers/Post';
import { fetchCreateComment } from '../../../redux/Thunks/Post/CreateCommentThunk';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

function CreatePost() {
  const { token } = useAppSelector((s) => s.User);
  const [text, setText] = useState('');
  const { isComment, postId } = useAppSelector(s => s.Post);
  const dispatch = useAppDispatch();

  return (
    <StyledCreatePost
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          {
            dispatch(setNewPost(false))
            dispatch(setComment({ isComment: false, postId: 0 }))
          };
        }
      }}
    >
      <article
        onClick={() => {
          // desabilita o envio como comentário e fecha o formulário
          dispatch(setNewPost(false))
          dispatch(setComment({ isComment: false, postId: 0 }))
        }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // desabilita o envio como comentário e fecha o formulário
          dispatch(setNewPost(false));
          dispatch(setComment({ isComment: false, postId: 0 }))

          // Caso seja um comentário faz o envio para a rota de comentários.
          if (isComment) {
            dispatch(fetchCreateComment({ authorization: token, text, postId }));
            return;
          }
          dispatch(fetchCreatePost({ authorization: token, text }));
        }}
      >
        <section>
          <button onClick={() => dispatch(setNewPost(false))}>
            <BsArrowReturnLeft />
          </button>
          <button onClick={() => dispatch(setNewPost(false))}>
            <IoClose />
          </button>
          <button type="submit">Postar</button>
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
