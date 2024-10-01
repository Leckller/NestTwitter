import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import UserConnect from '../service/User-Connection.Service';
import PostUserCreateDto from '../service/Post-User-Create.Dto';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setToken } from '../redux/Reducers/User';

function Register() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [register, setRegister] = useState <Partial<UserType>>({
    email: '', password: '', name: '', address: '',
  });

  const registerFields = [
    { key: 'email', text: 'Email' },
    { key: 'password', text: 'Senha' },
    { key: 'name', text: 'Nome' },
    { key: 'address', text: '@ do usuário' },
  ];

  const handleRegister = (key: 'email' | 'senha', value: string) => {
    setRegister({ ...register, [key]: value });
  };

  return (
    <div>

      <main>

        <form
          onSubmit={ async (e) => {
            e.preventDefault();
            const { name, address, password, email } = register;
            const createUser = await UserConnect.createUser(
              new PostUserCreateDto(name!, address!, password!, email!),
            );

            if (createUser?.statusCode === 400) {
              console.log(createUser);
              return;
            }

            dispatch(setToken(createUser.token));
          } }
        >

          {registerFields.map(({ text, key }) => (
            <label key={ text }>
              <h2>{text}</h2>
              <input
                value={ register[key as keyof UserType] }
                onChange={ ({ target: { value } }) => {
                  handleRegister(key as any, value);
                } }
                type="text"
              />
            </label>

          ))}

          <button>Criar conta</button>

          <p>
            Já possui uma conta?
            <button
              onClick={ () => navigate('/') }
              className="text-blue-600"
            >
              Faça o login!
            </button>
          </p>

        </form>

      </main>
    </div>
  );
}

export default Register;
