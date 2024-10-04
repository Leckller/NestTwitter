import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { toggleVisible } from '../../../redux/Reducers/Popup';
import PostConnect from '../../../service/Post-Connection.Service';
import { IoColorPalette } from 'react-icons/io5';
import { MdOutlineBorderColor } from 'react-icons/md';

function CreatePost() {
  const dispatch = useAppDispatch();

  const { User:{token} } = useAppSelector((s) => s);

  const [colors, setColors] = useState({bgColor: '', textColor: ''});

  const [text, setText] = useState('');

  const [disableButton, setDisableButton] = useState(false);

  return (
    <form
      onKeyDown={(e) => {if(e.key === "Escape") {dispatch(toggleVisible())}}}
      className="w-full h-full flex flex-col gap-5"
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          setDisableButton(true);

          const createPost = await PostConnect.postCreate({text, ...colors}, token);

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
        
      }}
    >

      <textarea
        className="outline-none resize-none bg-transparent w-full h-full p-4 textAreaBgColor rounded-lg textColor transition-all-3"
        placeholder="O que está acontecendo?"
        onChange={({ target: { value } }) => setText(value)}
      />

      <section className='flex justify-between'>
        <label className='flex items-center'>
          <IoColorPalette className='bgColor'/>
          <input 
            type='color'
            onChange={({target: {value}}) => {

              setColors(prev => ({...prev, bgColor: value}));

              (document.querySelector('.bgColor') as HTMLDivElement).style.color = value;

              const textArea = (document.querySelector('.textAreaBgColor') as HTMLDivElement);

              textArea.style.backgroundColor = value;

              textArea.classList.add(`placeholder-[${colors.textColor}]`)

            }} 
            className='invisible w-0'/>
        </label>

        <label className='flex items-center '>
          <MdOutlineBorderColor className='textColor' />
          <input 
            type='color'
            onChange={({target: {value}}) => {

              setColors(prev => ({...prev, textColor: value}));

              const texts = document.querySelectorAll('.textColor') as any as HTMLDivElement[];

              texts.forEach((e) => {

                e.style.color = value;
              });

            }} 
            className='invisible w-0'/>
        </label>

        <button disabled={disableButton} className='disabled:cursor-not-allowed' type="submit">
          Postar!
        </button>

      </section>
    </form>
  );
}

export default CreatePost;