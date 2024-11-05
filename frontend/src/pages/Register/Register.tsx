import { useState } from 'react';
import { StyledRegister } from './StyledRegister';

function Register() {
  const [viewPassword, setViewPassword] = useState(false);

  return (
    <StyledRegister>
      <form onSubmit={ (e) => e.preventDefault() }>
        <label>
          <h2>Email</h2>
          <input type="email" />
        </label>
        <label>
          <h2>Password</h2>
          <input type={ viewPassword ? 'text' : 'password' } />
        </label>
        <button onClick={ () => setViewPassword((prev) => !prev) }>
          {viewPassword ? 'Hidde password' : 'Show password'}
        </button>
      </form>
    </StyledRegister>
  );
}

export default Register;
