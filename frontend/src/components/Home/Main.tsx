import { useEffect } from 'react';
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
      if (!resp) {
        alert('Ops... parece que tivemos um problema com as postagens');
        return;
      }
      dispatch(setPosts(resp.posts));
    });
  }, []);

  return (
    <main className="relative h-[80%] w-full flex items-center justify-center">
      <section className="flex flex-col w-full max-w-[440px] items-start">
        {posts.map((post) => (
          <Post post={ post } key={ post.id } />
        ))}

        <button
          className="size-12 rounded-full flex items-center justify-center
        absolute bg-green-500 bottom-5 right-5"
          onClick={ () => {
            dispatch(toggleVisible());
          } }
        >
          +
        </button>
      </section>
    </main>
  );
}

export default Main;
