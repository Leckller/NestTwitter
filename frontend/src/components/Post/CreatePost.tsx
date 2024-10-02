import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleVisible } from '../../redux/Reducers/Popup';
import PostConnect from '../../service/Post-Connection.Service';

function CreatePost() {
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((s) => s.User);

  const [text, setText] = useState('');

  return (
    <form
      className="w-full h-full flex flex-col gap-5"
      onSubmit={ async (e) => {
        e.preventDefault();

        const createPost = await PostConnect.postCreate(text, token);

        if (!createPost.ok) {
          alert('Ops... não foi possível enviar o seu post');
          return;
        }

        dispatch(toggleVisible());
      } }
    >

      <textarea
        className="outline-none resize-none w-full h-full p-4 rounded-lg "
        placeholder="adsad"
        onChange={ ({ target: { value } }) => setText(value) }
      />

      <section>
        <button type="submit">
          Postar!
        </button>
      </section>
    </form>
  );
}

export default CreatePost;
