import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledRegister } from './StyledRegister';
import { RegisterRequest } from '../../types/User/Register.Request';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { fetchRegister } from '../../redux/Thunks/User/RegisterThunk';

type FieldTypes = 'email' | 'address' | 'password' | 'name' | 'photo';

function Register() {
  const [viewPassword, setViewPassword] = useState(false);

  const [fields, setFields] = useState<RegisterRequest>({
    address: '', banner: '', email: '', name: '', password: '', photo: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSetField = (field: FieldTypes, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    dispatch(fetchRegister(fields));
  };

  return (
    <StyledRegister>
      <form
        onSubmit={ (e) => e.preventDefault() }
      >

        <label>
          <h2>Email</h2>
          <input
            onChange={ ({ target: { value } }) => handleSetField('email', value) }
            type="email"
          />
        </label>

        <label>
          <h2>Name</h2>
          <input
            onChange={ ({ target: { value } }) => handleSetField('name', value) }
            type="text"
          />
        </label>

        <label>
          <h2>Unique Name</h2>
          <input
            onChange={ ({ target: { value } }) => handleSetField('address', value) }
            type="text"
          />
        </label>

        <label>
          <h2>Password</h2>
          <input
            onChange={ ({ target: { value } }) => handleSetField('password', value) }
            type={ viewPassword ? 'text' : 'password' }
          />
        </label>

        <button onClick={ () => setViewPassword((prev) => !prev) }>
          {viewPassword ? 'Hidde password' : 'Show password'}
        </button>

        <section>
          <button onClick={ () => navigate('/login') }>
            Já possui uma conta? Faça o login!
          </button>
          <button type="submit" onClick={ () => handleSubmit() }>
            Cadastrar
          </button>
        </section>

      </form>
    </StyledRegister>
  );
}

export default Register;
