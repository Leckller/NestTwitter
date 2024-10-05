import { useEffect } from 'react';
import { MdAddCircle } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { toggleVisible } from '../../redux/Reducers/Popup';
import PostConnect from '../../service/Post-Connection.Service';
import { setPosts } from '../../redux/Reducers/Posts';
import Post from '../Post/Post';

function Main() {
  const dispatch = useAppDispatch();

  const { User: { token }, Posts: { posts } } = useAppSelector((s) => s);

  useEffect(() => {
    PostConnect.globalPosts(token).then((resp) => {
      if (!resp.ok) {
        alert('Ops... parece que tivemos um problema com as postagens');
        return;
      }
      console.log(resp);
      dispatch(setPosts(resp.result.posts));
    });
  }, []);

  return (
    <main className="relative w-full flex items-center justify-center">

      <section className="flex flex-col w-full max-w-[440px] items-start">
        {posts.map((post) => (
          <Post post={ post } key={ post.id } />
        ))}

        <button
          className="size-12 rounded-full flex items-center justify-center
          fixed bg-green-500 bottom-14 right-5"
          onClick={ () => {
            dispatch(toggleVisible());
          } }
        >
          <MdAddCircle />
        </button>

      </section>
    </main>
  );
}

export default Main;
