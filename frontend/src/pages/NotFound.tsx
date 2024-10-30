import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <section>
      <p className="text-2xl text-left">
        Tudo vazio por aqui...
      </p>
      <button onClick={ () => navigate('/') }>
        <p>
          Voltar para rota
          <strong>/</strong>
        </p>
      </button>
    </section>
  );
}

export default NotFound;
