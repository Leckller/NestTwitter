import { useNavigate } from 'react-router-dom';
import { StyledNotFound } from './StyledNotFound';

function NotFound({ route }: { route: string }) {
  const navigate = useNavigate();
  return (
    <StyledNotFound>
      <p>
        Tudo vazio por aqui...
      </p>
      <button onClick={ () => navigate(`/${route}`) }>
        <p>
          Voltar para rota
          <strong>{route}</strong>
        </p>
      </button>
    </StyledNotFound>
  );
}

export default NotFound;
