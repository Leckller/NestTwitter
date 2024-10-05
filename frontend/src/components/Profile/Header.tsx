import { useNavigate } from 'react-router-dom';
import GetUserByAddressDto from '../../service/Get-User-By-Address.Dto';
import { banner, Jake } from '../../assets/index';

function Header({ user }: { user: GetUserByAddressDto }) {
  const navigate = useNavigate();

  return (
    <header
      className="flex flex-col w-full sticky max-w-[440px]"
      style={ { color: user.textColor } }
    >
      <section className="pl-3 pr-3 absolute flex justify-between w-full">
        <button onClick={ () => navigate(-1) }>voltar</button>
        <button>...</button>
      </section>

      <section className="relative">

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

          <p className="flex gap-2 items-center">
            <strong className="text-lg">
              {user.name}
            </strong>
            {user.address}
          </p>

        </section>
      </section>
    </header>
  );
}

export default Header;
