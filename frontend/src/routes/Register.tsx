import { useState } from 'react';
import { UserType } from '../types';

function Register() {
  const [register, setRegister] = useState <Partial<UserType>>({
    email: '', password: '',
  });
  const [newUser, setNewUser] = useState(true);
  const loginFields = [
    { key: 'email', text: 'Email' },
    { key: 'password', text: 'Senha' },
    { key: 'name', text: 'Nome' },
    { key: 'address', text: '@ do usuário' },
  ];
  const registerFields = loginFields.slice(0, 2);

  const handleRegister = (key: 'email' | 'senha', value: string) => {
    setRegister({ ...register, [key]: value });
  };

  return (
    <div>
      <header>
        <h1>
          Bem vindo!
        </h1>
      </header>

      <main>

        {newUser ? (
          <form onSubmit={ (e) => e.preventDefault() }>

            {registerFields.map(({ text, key }) => (
              <label key={ text }>
                <h2>{text}</h2>
                <input
                  onChange={ ({ target: { value } }) => {
                    handleRegister(key as any, value);
                  } }
                  type="text"
                />
              </label>

            ))}

            <button>Criar conta</button>
            <p>
              Não possui uma conta?
              <button
                onClick={ () => setNewUser(false) }
                className="text-blue-600"
              >
                Crie agora!
              </button>
            </p>
          </form>

        ) : (

          <form onSubmit={ (e) => e.preventDefault() }>

            {loginFields.map(({ text, key }) => (
              <label key={ text }>
                <h2>{text}</h2>
                <input
                  onChange={ ({ target: { value } }) => {
                    handleRegister(key as any, value);
                  } }
                  type="text"
                />
              </label>

            ))}

            <p>
              Já possui uma conta?
              <button
                onClick={ () => setNewUser(true) }
                className="text-blue-600"
              >
                Faça o login!
              </button>
            </p>
          </form>
        )}

      </main>
    </div>
  );
}

export default Register;
