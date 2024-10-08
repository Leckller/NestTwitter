import GetUserByAddressDto from '../../service/Get-User-By-Address.Dto';
import Post from '../Post/Post';

function Main({ user }: { user: GetUserByAddressDto }) {
  return (
    <main className="max-w-[440px] flex flex-col h-full w-full">
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
  );
}

export default Main;
