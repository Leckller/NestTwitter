import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '../types';
import UserConnect from '../service/User-Connection.Service';
import PostUserCreateDto from '../service/Post-User-Create.Dto';
import { useAppDispatch } from '../hooks/reduxHooks';
import { setToken } from '../redux/Reducers/User';
import Field from '../components/Register-Login/Field';

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

  return (
    <div className="w-screen h-screen flex items-center justify-center">

      <main className="">

        <form
          className="flex flex-col gap-5"
          onSubmit={ async (e) => {
            e.preventDefault();
            const { name, address, password, email } = register;

            const {message, ok, result: {token,user}} = await UserConnect.createUser(

              new PostUserCreateDto(name!, address!, password!, email!),

            );

            if (!ok) {

              alert(message);
              return;

            }

            dispatch(setToken({token, user}));
          } }
        >

          {registerFields.map(({ text, key }) => (
            <Field
              key={ text }
              keyField={ key }
              password={ false }
              register={ register }
              setRegister={ setRegister }
              text={ text }
            />
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
