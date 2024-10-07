import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHooks';
import UserConnect from '../service/User-Connection.Service';
import GetUserByAddressDto from '../service/Get-User-By-Address.Dto';
import { Header, Main } from '../components/Profile';
import EditProfile from '../components/Popups/Profile/EditProfile';
import Popup from '../components/Popups/Popup';
import Footer from '../components/Layout/Footer';

function Profile() {
  const navigate = useNavigate();

  const { address } = useParams();

  const { User: { token }, PopUp: { visible } } = useAppSelector((s) => s);

  const [user, setUser] = useState<GetUserByAddressDto>({
    address: '',
    banner: '',
    name: '',
    photo: '',
    bgColor: '',
    textColor: '',
    posts: [],
  });

  useEffect(() => {
    UserConnect.getUserByAddress(address || '', token).then((resp) => {
      if (!resp.ok) {
        navigate('notFound');
        alert('Usuário não encontado');
        return;
      }

      setUser(resp.result);
    });
  }, [address]);

  return (
    <div
      className="flex flex-col justify-between h-screen items-center w-full
    "
      style={ { color: user.textColor, backgroundColor: user.bgColor } }
    >
      {visible && (
        <Popup>
          <EditProfile />
        </Popup>
      )}

      <Header user={ user } />

      <Main user={ user } />

      <Footer />
    </div>
  );
}

export default Profile;
