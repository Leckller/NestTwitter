/* eslint-disable react/jsx-max-depth */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6';
import { RegisterRequest } from '../../types/User/Register.Request';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchRegister } from '../../redux/Thunks/User/RegisterThunk';
import { StyledLogin } from '../Login/StyledLogin';
import Loading from '../../components/Loading/Loading';
import ValidadorDeSenha from '../../utils/ValidadorDeSenha';

type FieldTypes = 'email' | 'address' | 'password' | 'name' | 'photo';

function Register() {
  const [viewPassword, setViewPassword] = useState(false);

  const { loading } = useAppSelector((s) => s.User);

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
        onSubmit={ (e) => e.preventDefault() }
      >

        <section>
          <article>
            <input
              onChange={ ({ target: { value } }) => handleSetField('email', value) }
              required
              type="text"
            />
            <label htmlFor="email-i">Email</label>
          </article>

          <article>
            <input
              onChange={ ({ target: { value } }) => handleSetField('name', value) }
              required
              type="text"
            />
            <label htmlFor="name-i">Name</label>
          </article>

          <article>
            <input
              onChange={ ({ target: { value } }) => handleSetField('address', value) }
              required
              type="text"
            />
            <label htmlFor="unique-name-i">Unique Name</label>
          </article>

          <div>
            <article>
              <input
                onChange={ ({ target: { value } }) => handleSetField('password', value) }
                required
                type={ viewPassword ? 'text' : 'password' }
              />
              <label htmlFor="password-i">Password</label>
            </article>

            <button onClick={ () => setViewPassword((prev) => !prev) }>
              {viewPassword ? (<FaEyeSlash />) : (<FaRegEye />)}
            </button>
          </div>

          <article id="password-requirements">
            <h2>Sua senha precisa ter:</h2>
            <p
              style={ {
                color: `${fields.password.length > 5 ? 'blue' : 'red'}` } }
            >
              Ter mais que 5 caracteres
            </p>
            <p
              style={ {
                color: `${ValidadorDeSenha
                  .hasSpecialChar(fields.password) ? 'blue' : 'red'}` } }
            >
              Caractere especial
            </p>
            <p
              style={ {
                color: `${ValidadorDeSenha
                  .hasUpperCase(fields.password) ? 'blue' : 'red'}` } }
            >
              Letra maiúscula
            </p>
            <p
              style={ {
                color: `${ValidadorDeSenha
                  .hasLowerCase(fields.password) ? 'blue' : 'red'}` } }
            >
              Letra minúscula
            </p>
            <p
              style={ {
                color: `${ValidadorDeSenha
                  .hasNumber(fields.password) ? 'blue' : 'red'}` } }
            >
              Número
            </p>
          </article>

        </section>

        <section>

          <p>
            Já possui uma conta?
            <Link to="/login">
              Faça o login!
            </Link>
          </p>

          <button
            disabled={ loading }
            type="submit"
            onClick={ () => handleSubmit() }
          >
            {loading ? <Loading /> : 'Cadastrar'}
          </button>

        </section>

      </form>
    </StyledLogin>
  );
}

export default Register;
