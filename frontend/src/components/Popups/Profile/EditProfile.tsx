import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import UserConnectionService from '../../../service/User-Connection.Service';
import { setUserColors } from '../../../redux/Reducers/User';

function EditProfile() {
  const { User: { token, user: { textColor, bgColor } } } = useAppSelector((s) => s);
  const [colors, setColors] = useState({ bgColor, textColor });
  const dispatch = useAppDispatch();

  return (
    <form
      onSubmit={ async (e) => {
        e.preventDefault();
        try {
          const request = await UserConnectionService
            .editColors(colors.bgColor, colors.textColor, token);

          if (!request.ok) {
            alert('Erro ao realizar a edição das cores');
          }
          dispatch(setUserColors({
            bgColor: colors.bgColor,
            textColor: colors.textColor,
          }));
        } catch {
          alert('Erro no servidor vius');
        }
      } }
      className=""
    >
      <label>
        <h2>Cor de fundo</h2>
        <input
          onChange={ ({ target: { value } }) => {
            setColors((prev) => ({ ...prev, bgColor: value }));
          } }
          type="color"
          value={ colors.bgColor }
        />
      </label>
      <label>
        <h2>Cor do texto</h2>
        <input
          onChange={ ({ target: { value } }) => {
            setColors((prev) => ({ ...prev, textColor: value }));
          } }
          type="color"
          value={ colors.textColor }
        />
      </label>
      <button type="submit">Salvar</button>
    </form>
  );
}

export default EditProfile;
