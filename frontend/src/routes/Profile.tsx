import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserConnect from '../service/User-Connection.Service';
import { useAppSelector } from '../hooks/reduxHooks';
import Post from '../components/Post/Post';
import GetUserByAddressDto from '../service/Get-User-By-Address.Dto';
import Header from '../components/Profile/Header';

function Profile() {
  const navigate = useNavigate();

  const { address } = useParams();

  const { token } = useAppSelector((s) => s.User);

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
      console.log(resp);
      if (!resp.ok) {
        navigate('notFound');
        alert('Usuário não encontado');
        return;
      }
      const body = document.querySelector('body')!;
      body.style.backgroundColor = resp.result.bgColor;
      setUser(resp.result);
    });
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center w-full
    "
    >

      <Header user={ user } />

      <main className="max-w-[440px] flex flex-col w-full">
        {user.posts.map((post) => (
          <Post
            post={ {
              user: {
                address: user.address,
                id: 1,
                name: user.name,
                photo: user.photo,
              },
              likes: [],
              id: post.id,
              text: post.text,
              bgColor: post.bgColor,
              textColor: post.textColor,
            } }
            key={ post.id }
          />
        ))}

      </main>
    </div>
  );
}

export default Profile;
