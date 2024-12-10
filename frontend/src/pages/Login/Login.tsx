import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { StyledLogin } from './StyledLogin';
import { fetchLogin } from '../../redux/Thunks/User/LoginThunk';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa6';

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
      <svg className='wave tzero' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#5000ca" fill-opacity="1" d="M0,192L11.4,197.3C22.9,203,46,213,69,197.3C91.4,181,114,139,137,133.3C160,128,183,160,206,181.3C228.6,203,251,213,274,202.7C297.1,192,320,160,343,154.7C365.7,149,389,171,411,186.7C434.3,203,457,213,480,213.3C502.9,213,526,203,549,192C571.4,181,594,171,617,160C640,149,663,139,686,128C708.6,117,731,107,754,112C777.1,117,800,139,823,122.7C845.7,107,869,53,891,37.3C914.3,21,937,43,960,42.7C982.9,43,1006,21,1029,37.3C1051.4,53,1074,107,1097,138.7C1120,171,1143,181,1166,192C1188.6,203,1211,213,1234,208C1257.1,203,1280,181,1303,160C1325.7,139,1349,117,1371,96C1394.3,75,1417,53,1429,42.7L1440,32L1440,0L1428.6,0C1417.1,0,1394,0,1371,0C1348.6,0,1326,0,1303,0C1280,0,1257,0,1234,0C1211.4,0,1189,0,1166,0C1142.9,0,1120,0,1097,0C1074.3,0,1051,0,1029,0C1005.7,0,983,0,960,0C937.1,0,914,0,891,0C868.6,0,846,0,823,0C800,0,777,0,754,0C731.4,0,709,0,686,0C662.9,0,640,0,617,0C594.3,0,571,0,549,0C525.7,0,503,0,480,0C457.1,0,434,0,411,0C388.6,0,366,0,343,0C320,0,297,0,274,0C251.4,0,229,0,206,0C182.9,0,160,0,137,0C114.3,0,91,0,69,0C45.7,0,23,0,11,0L0,0Z"></path>
      </svg>
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

      <svg className='wave bzero' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#5000ca" fill-opacity="1" d="M0,192L11.4,197.3C22.9,203,46,213,69,197.3C91.4,181,114,139,137,133.3C160,128,183,160,206,181.3C228.6,203,251,213,274,202.7C297.1,192,320,160,343,154.7C365.7,149,389,171,411,186.7C434.3,203,457,213,480,213.3C502.9,213,526,203,549,192C571.4,181,594,171,617,160C640,149,663,139,686,128C708.6,117,731,107,754,112C777.1,117,800,139,823,122.7C845.7,107,869,53,891,37.3C914.3,21,937,43,960,42.7C982.9,43,1006,21,1029,37.3C1051.4,53,1074,107,1097,138.7C1120,171,1143,181,1166,192C1188.6,203,1211,213,1234,208C1257.1,203,1280,181,1303,160C1325.7,139,1349,117,1371,96C1394.3,75,1417,53,1429,42.7L1440,32L1440,320L1428.6,320C1417.1,320,1394,320,1371,320C1348.6,320,1326,320,1303,320C1280,320,1257,320,1234,320C1211.4,320,1189,320,1166,320C1142.9,320,1120,320,1097,320C1074.3,320,1051,320,1029,320C1005.7,320,983,320,960,320C937.1,320,914,320,891,320C868.6,320,846,320,823,320C800,320,777,320,754,320C731.4,320,709,320,686,320C662.9,320,640,320,617,320C594.3,320,571,320,549,320C525.7,320,503,320,480,320C457.1,320,434,320,411,320C388.6,320,366,320,343,320C320,320,297,320,274,320C251.4,320,229,320,206,320C182.9,320,160,320,137,320C114.3,320,91,320,69,320C45.7,320,23,320,11,320L0,320Z"></path>
      </svg>
    </StyledLogin>
  );
}

export default Login;
