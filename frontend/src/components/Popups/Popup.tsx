import { ReactNode } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleVisible } from '../../redux/Reducers/Popup';

// Componente de background para a popup
// Para criar um popup basta criar um componente qualquer e encapsular dentro da tag <Popup> </Popup>
function Popup({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const {
    PopUp: { name },
    User: { user: { bgColor, textColor } },
  } = useAppSelector((s) => s);

  return (
    // Pequena separação em sections para dar o evento de click fora do alerta, e assim fazendo com que o mesmo acabe fechando
    <section
      className="flex justify-center items-center w-screen h-screen fixed top-0 left-0
      z-[1000]"
    >

      <section
        className="fixed flex justify-center items-center z-[2000]
      w-screen h-screen "
        style={ {
          backdropFilter: 'blur(3px)',
          color: textColor } }
        onMouseDownCapture={ () => dispatch(toggleVisible()) }
      />

      {/* Este é o html do popup */}
      <section
        className="z-[3000] p-4 flex flex-col gap-5
        w-[80%] h-[80%] max-w-[1000px] max-h-[600px] rounded-2xl"
        style={ { backgroundColor: bgColor } }
      >
        <section className="flex flex-row justify-between">
          <h2 className="font-bold text-2xl">{name}</h2>
          <button
            onClick={ () => dispatch(toggleVisible()) }
            className="text-2xl"
          >
            <IoMdCloseCircle />
          </button>
        </section>

        {children}
      </section>

    </section>
  );
}

export default Popup;
