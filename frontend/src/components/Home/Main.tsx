import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleVisible } from '../../redux/Reducers/Popup';
import PostConnect from '../../service/Post-Connection.Service';

function Main() {
  const dispatch = useAppDispatch();

  const { User: { token } } = useAppSelector((s) => s);

  useEffect(() => {
    PostConnect.globalPosts(token).then((resp) => {
      console.log(resp);
    });
  }, []);

  return (
    <main className="relative h-[80%]">

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
