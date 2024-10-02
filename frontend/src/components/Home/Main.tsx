import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleVisible } from '../../redux/Reducers/Popup';

function Main() {
  const dispatch = useAppDispatch();

  return (
    <main className="relative h-[80%]">
      main

      <button
        className="size-12 rounded-full flex items-center justify-center
        absolute bg-green-500 bottom-5 right-5"
        onClick={ () => {
          dispatch(toggleVisible());
        } }
      >
        +
      </button>
    </main>
  );
}

export default Main;
