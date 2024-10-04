import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleCustomColors } from '../../redux/Reducers/User';

function Main() {
  const dispatch = useAppDispatch();
  return (
    <main>
      <label>
        <h2>Cores Customizadas</h2>
        <input type="checkbox" onClick={ () => dispatch(toggleCustomColors()) } />
      </label>
    </main>
  );
}

export default Main;
