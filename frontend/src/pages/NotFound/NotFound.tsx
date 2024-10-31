import { useNavigate } from 'react-router-dom';
import { StyledNotFound } from './StyledNotFound';

function NotFound() {
  const navigate = useNavigate();
  return (
    <StyledNotFound>
      <p>
        Tudo vazio por aqui...
      </p>
      <button onClick={ () => navigate('/') }>
        <p>
          Voltar para rota
          <strong>/</strong>
        </p>
      </button>
    </StyledNotFound>
  );
}

export default NotFound;
