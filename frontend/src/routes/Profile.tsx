import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserConnect from '../service/User-Connection.Service';
import { useAppSelector } from '../hooks/reduxHooks';

function Profile() {
  const navigate = useNavigate();

  const { address } = useParams();

  const { token } = useAppSelector((s) => s.User);

  const [user, setUser] = useState({
    address: 'teste', banner: '', name: 'teste', photo: '', posts: [],
  });

  useEffect(() => {
    UserConnect.getUserByAddress(address || '', token).then((resp) => {
      if (!('address' in resp)) {
        navigate('notFound');
        alert('Usuário não encontado');
        return;
      }
      setUser(resp as any);
    });
  }, []);

  return (
    <div>

      <header>
        <button onClick={ () => navigate(-1) }>voltar</button>
      </header>

      <p className="flex gap-2 items-center">
        <strong className="text-lg">
          {user.name}
        </strong>
        {user.address}
      </p>

    </div>
  );
}

export default Profile;
