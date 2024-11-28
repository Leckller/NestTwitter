import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { StyledLogin } from './StyledLogin';
import { fetchLogin } from '../../redux/Thunks/User/LoginThunk';

type FieldTypes = 'email' | 'password';

function Login() {
  const [viewPassword, setViewPassword] = useState(false);

  const [fields, setFields] = useState<{ email: string, password: string }>({ email: '', password: '' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

        <label>
          <h2>Email</h2>
          <input
            onChange={({ target: { value } }) => handleSetField('email', value)}
            type="email"
          />
        </label>

        <label>
          <h2>Password</h2>
          <input
            onChange={({ target: { value } }) => handleSetField('password', value)}
            type={viewPassword ? 'text' : 'password'}
          />
        </label>

        <button onClick={() => setViewPassword((prev) => !prev)}>
          {viewPassword ? 'Hidde password' : 'Show password'}
        </button>

        <section>
          <button onClick={() => navigate('/register')}>
            Ainda não possui uma conta? cadastre-se!
          </button>
          <button type="submit" onClick={() => handleSubmit()}>
            Logar
          </button>
        </section>

      </form>
    </StyledLogin>
  );
}

export default Login;
