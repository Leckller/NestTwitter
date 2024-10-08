import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleCustomColors } from '../../redux/Reducers/User';

function Header() {
  const dispatch = useAppDispatch();

  return (
    <header>
      header
      <button onClick={ () => dispatch(toggleCustomColors()) }>
        customColors
      </button>
    </header>
  );
}

export default Header;
