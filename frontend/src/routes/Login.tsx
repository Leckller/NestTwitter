import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserConnect from '../service/User-Connection.Service';
import { UserType } from '../types';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setToken } from '../redux/Reducers/User';
import Field from '../components/Register-Login/Field';

function Login() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [register, setRegister] = useState<Partial<UserType>>({
    email: '', password: '',
  });

  const fields = [
    { key: 'email', text: 'Email', password: false },
    { key: 'password', text: 'Senha', password: true },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center">

      <main className="">
        <form
          className="flex flex-col gap-5"
          onSubmit={ async (e) => {
            e.preventDefault();
            const {ok, message, result: {token, user}} = await UserConnect
              .loginUser(register.email!, register.password!);

            if (!ok) {
              alert(message);
              return;
            }

            dispatch(setToken({token, user}));
          } }
        >

          {fields.map(({ text, key, password }) => (
            <Field
              key={ text }
              keyField={ key }
              password={ password }
              register={ register }
              setRegister={ setRegister }
              text={ text }
            />
          ))}

          <button>Iniciar Sessão</button>

          <p>
            Não possui uma conta?
            <button
              onClick={ () => navigate('/register') }
              className="text-blue-600"
            >
              Crie agora!
            </button>
          </p>

        </form>

      </main>

    </div>
  );
}

export default Login;
