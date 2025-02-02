import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { StyledLogin } from './StyledLogin';
import { fetchLogin } from '../../redux/Thunks/User/LoginThunk';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6';

type FieldTypes = 'email' | 'password';

function Login() {
  const [viewPassword, setViewPassword] = useState(false);

  const [fields, setFields] = useState<{ email: string, password: string }>({ email: '', password: '' });

  const dispatch = useAppDispatch();

  const handleSetField = (field: FieldTypes, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(fetchLogin(fields));
  };

  return (
    <StyledLogin>

      <form
        onSubmit={(e) => e.preventDefault()}
      >

        <section>
          <article>
            <input
              value={fields.email}
              id='email-i'
              required
              onChange={({ target: { value } }) => handleSetField('email', value)}
              type="text"
            />
            <label htmlFor='email-i'>Email</label>
          </article>

          <div>
            <article>
              <input
                value={fields.password}
                id='password-i'
                required
                onChange={({ target: { value } }) => handleSetField('password', value)}
                type={viewPassword ? 'text' : 'password'}
              />
              <label htmlFor='password-i'>Password</label>
            </article>

            <button onClick={() => setViewPassword((prev) => !prev)}>
              {
                viewPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaRegEye />
                )
              }
            </button>
          </div>

        </section>

        <section>
          <p>
            Ainda não possui uma conta?
            <Link to={'/register'}>
              cadastre-se!
            </Link>
          </p>
          <button type="submit" onClick={() => handleSubmit()}>
            Logar
          </button>
        </section>

      </form>

    </StyledLogin>
  );
}

export default Login;
