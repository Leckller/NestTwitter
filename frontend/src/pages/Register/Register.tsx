import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterRequest } from '../../types/User/Register.Request';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchRegister } from '../../redux/Thunks/User/RegisterThunk';
import { StyledLogin } from '../Login/StyledLogin';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6';

type FieldTypes = 'email' | 'address' | 'password' | 'name' | 'photo';

function Register() {
  const [viewPassword, setViewPassword] = useState(false);

  const [fields, setFields] = useState<RegisterRequest>({
    address: '', banner: '', email: '', name: '', password: '', photo: '',
  });

  const dispatch = useAppDispatch();

  const handleSetField = (field: FieldTypes, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(fetchRegister(fields));
  };

  return (
    <StyledLogin>

      <form
        onSubmit={(e) => e.preventDefault()}
      >

        <section>
          <article>
            <input
              onChange={({ target: { value } }) => handleSetField('email', value)}
              required
              type="text"
            />
            <label htmlFor='email-i'>Email</label>
          </article>

          <article>
            <input
              onChange={({ target: { value } }) => handleSetField('name', value)}
              required
              type="text"
            />
            <label htmlFor='name-i'>Name</label>
          </article>

          <article>
            <input
              onChange={({ target: { value } }) => handleSetField('address', value)}
              required
              type="text"
            />
            <label htmlFor='unique-name-i'>Unique Name</label>
          </article>

          <div>
            <article>
              <input
                onChange={({ target: { value } }) => handleSetField('password', value)}
                required
                type={viewPassword ? 'text' : 'password'}
              />
              <label htmlFor='password-i'>Password</label>
            </article>

            <button onClick={() => setViewPassword((prev) => !prev)}>
              {viewPassword ? (<FaEyeSlash />) : (<FaRegEye />)}
            </button>
          </div>
        </section>

        <section>
          <p>
            Já possui uma conta?
            <Link to={'/login'}>
              Faça o login!
            </Link>
          </p>
          <button type="submit" onClick={() => handleSubmit()}>
            Cadastrar
          </button>
        </section>

      </form>
    </StyledLogin>
  );
}

export default Register;
