import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col h-screen w-screen items-center justify-around">
      <p className="text-2xl text-left">
        Tudo vazio por aqui...
      </p>
      <button onClick={ () => navigate('/') }>
        <p className="flex gap-3 border-2 border-black p-2 rounded">
          Voltar para rota
          <strong>/</strong>
        </p>
      </button>
    </section>
  );
}

export default NotFound;
