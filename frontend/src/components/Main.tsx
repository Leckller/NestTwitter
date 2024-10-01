import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { decClick, incClick, resetClick, setClick } from '../redux/Reducers/Clicker';

function Main() {
  const { clicks } = useAppSelector((state) => state.Clicker);
  const [input, setInput] = useState(0);
  // use a constante dispatch para disparar suas actions.
  const dispatch = useAppDispatch();

  const handleClick = (type?: 'inc' | 'dec' | 'set') => {
    switch (type) {
      case 'inc':
        dispatch(incClick());
        break;
      case 'dec':
        dispatch(decClick());
        break;
      case 'set':
        dispatch(setClick(input));
        break;
      default:
        dispatch(resetClick());
        break;
    }
  };
  return (
    <main className="flex flex-col h-40 w-full justify-around text-center">
      <p className="text-xl font-bold">
        {`Contador: ${clicks}`}
      </p>
      <section className="flex flex-row flex-wrap justify-around gap-4">
        <button
          className="border-2 rounded border-black p-2 w-1/6 min-w-32"
          onClick={() => handleClick('inc')}
        >
          Incrementar
        </button>
        <button
          className="border-2 rounded border-black p-2 w-1/6 min-w-32"
          onClick={() => handleClick('dec')}
        >
          Decrementar
        </button>
        <article className="flex flex-row flex-wrap justify-center gap-1">
          <label className="flex flex-row items-center justify-center flex-wrap gap-2">
            <p>Escolha um número: </p>
            <input
              className="border-2 rounded border-black p-2 min-w-32"
              placeholder="123"
              onChange={(event) => {
                setInput(Number(event.target.value));
              }}
            />
          </label>
          <button
            className="border-2 rounded border-black p-2 w-1/6 min-w-32"
            onClick={() => handleClick('set')}
          >
            Set clicks
          </button>
        </article>
        <button
          className="border-2 rounded border-black p-2 w-1/6 min-w-32"
          onClick={() => handleClick()}
        >
          reset
        </button>
      </section>
    </main>
  );
}

export default Main;
