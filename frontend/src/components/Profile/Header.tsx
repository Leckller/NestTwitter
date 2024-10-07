/* eslint-disable react/jsx-max-depth */
import { useNavigate } from 'react-router-dom';
import GetUserByAddressDto from '../../service/Get-User-By-Address.Dto';
import { banner, Jake } from '../../assets/index';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { toggleVisible } from '../../redux/Reducers/Popup';

function Header({ user }: { user: GetUserByAddressDto }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <header
      className="flex flex-col w-full sticky max-w-[440px]"
      style={ { color: user.textColor } }
    >

      <section className="relative">
        <section className="pl-3 pr-3 absolute flex justify-between w-full">
          <button onClick={ () => navigate(-1) }>voltar</button>
          <button>compartilhar</button>
        </section>

        <img
          src={ banner }
          alt="banner"
          className="h-[100px] w-full object-cover absolute -z-10"
        />

        <section className="flex flex-col p-4 pt-12">

          <img
            className="size-20 rounded-full border border-black"
            src={ user.photo || Jake }
            alt={ user.name }
          />

          <section className="flex gap-2 items-center justify-between">

            <p className="flex gap-2 items-center">
              <strong className="text-lg">
                {user.name}
              </strong>
              {`@${user.address}`}
            </p>

            <button
              onClick={ () => dispatch(toggleVisible()) }
              className="border rounded-2xl pl-2 pr-2 font-semibold"
            >
              Editar
            </button>
          </section>

        </section>
      </section>
    </header>
  );
}

export default Header;
