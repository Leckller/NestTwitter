import { UserType } from '../../types';

function Field({ text, keyField, password, register, setRegister }
: {
  text: string, keyField: string, password: boolean,
  register: Partial<UserType>, setRegister: (p: Partial<UserType>) => void
}) {
  const handleRegister = (value: string) => {
    setRegister({ ...register, [keyField]: value });
  };

  return (
    <label>
      <h2>{text}</h2>
      <input
        className="w-full border"
        value={ register[keyField as keyof UserType] }
        onChange={ ({ target: { value } }) => {
          handleRegister(value);
        } }
        type={ password ? 'password' : 'text' }
      />
    </label>
  );
}

export default Field;
