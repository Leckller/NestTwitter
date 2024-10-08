/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState } from 'react';
import { IoColorPalette } from 'react-icons/io5';
import { MdOutlineBorderColor } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { toggleVisible } from '../../../redux/Reducers/Popup';
import PostConnect from '../../../service/Post-Connection.Service';

function CreatePost() {
  const dispatch = useAppDispatch();

  const { User: { token, user } } = useAppSelector((s) => s);

  const [colors, setColors] = useState({ bgColor: '', textColor: '' });

  const [text, setText] = useState('');

  const [disableButton, setDisableButton] = useState(false);

  return (
    <form
      onKeyDown={ (e) => { if (e.key === 'Escape') { dispatch(toggleVisible()); } } }
      className="w-full h-full flex flex-col gap-5"
      onSubmit={ async (e) => {
        e.preventDefault();

        try {
          setDisableButton(true);

          const createPost = await PostConnect.postCreate({
            text,
            bgColor: colors.bgColor || user.bgColor,
            textColor: colors.textColor || user.textColor,
          }, token);

          if (!createPost.ok) {
            alert('Ops... não foi possível enviar o seu post');
            return;
          }

          dispatch(toggleVisible());

          setDisableButton(false);
        } catch {
          alert('Ops... não foi possível enviar o seu post');
          setDisableButton(false);
        }
      } }
    >

      <textarea
        className="outline-none resize-none bg-transparent w-full h-full p-4
        textAreaBgColor rounded-lg textColor transition-all-3"
        style={ { color: user.textColor, backgroundColor: user.bgColor } }
        placeholder="O que está acontecendo?"
        onChange={ ({ target: { value } }) => setText(value) }
      />

      <section className="flex justify-between">
        <label className="flex items-center">
          <IoColorPalette className="bgColor" />
          <input
            type="color"
            onChange={ ({ target: { value } }) => {
              setColors((prev) => ({ ...prev, bgColor: value }));

              (document.querySelector('.bgColor') as HTMLDivElement).style.color = value;

              const textArea = document
                .querySelector('.textAreaBgColor') as HTMLDivElement;

              textArea.style.backgroundColor = value;

              textArea.classList.add(`placeholder-[${colors.textColor}]`);
            } }
            className="invisible w-0"
          />
        </label>

        <label className="flex items-center">
          <MdOutlineBorderColor
            className="textColor"
            style={ { color: user.textColor } }
          />

          <input
            type="color"
            onChange={ ({ target: { value } }) => {
              setColors((prev) => ({ ...prev, textColor: value }));

              const texts = document
                .querySelectorAll('.textColor') as any as HTMLDivElement[];

              texts.forEach((e) => {
                e.style.color = value;
              });
            } }
            className="invisible w-0"
          />
        </label>

        <button
          disabled={ disableButton }
          className="disabled:cursor-not-allowed"
          type="submit"
        >
          Postar!
        </button>

      </section>
    </form>
  );
}

export default CreatePost;
