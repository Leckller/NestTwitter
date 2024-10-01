import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserConnect from '../service/User-Connection.Service';
import { UserType } from '../types';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setToken } from '../redux/Reducers/User';

function Login() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [register, setRegister] = useState <Partial<UserType>>({
    email: '', password: '',
  });

  const fields = [
    { key: 'email', text: 'Email' },
    { key: 'password', text: 'Senha', password: true },
  ];

  const handleRegister = (key: 'email' | 'senha', value: string) => {
    setRegister({ ...register, [key]: value });
  };

  return (
    <form
      onSubmit={ async (e) => {
        e.preventDefault();
        const login = await UserConnect
          .loginUser(register.email!, register.password!);

        if (login?.statusCode === 400) {
          console.log(login);
          return;
        }

        dispatch(setToken(login.token));
      } }
    >

      {fields.map(({ text, key, password }) => (
        <label key={ text }>
          <h2>{text}</h2>
          <input
            value={ register[key as keyof UserType] }
            onChange={ ({ target: { value } }) => {
              handleRegister(key as any, value);
            } }
            type={ password ? 'password' : 'text' }
          />
        </label>

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
  );
}

export default Login;
