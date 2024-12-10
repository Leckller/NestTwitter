import { Outlet } from 'react-router-dom';
import { StyledLayout } from './StyledLayout';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { StyledNewPost } from './StyledNewPost';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setNewPost } from '../../../redux/Reducers/Post';
import CreatePost from '../CreatePost/CreatePost';
import { StyledOutlet } from './StyledOutlet';
import NavigateButtons from '../Footer/NavigateButtons';
import { IoHomeOutline, IoPersonOutline } from "react-icons/io5";

function Layout() {
  const dispatch = useAppDispatch();
  const { newPost } = useAppSelector((s) => s.Post);
  const { userId } = useAppSelector((s) => s.User);

  return (
    <StyledLayout>

      <Header />

      <StyledOutlet>
        <aside>
          <NavigateButtons
            Icon={<IoHomeOutline className='icon' />}
            local='bubble'
            nav={"/home"}
            text='Home'
          />
          <NavigateButtons
            Icon={<IoPersonOutline className='icon' />}
            local='profile'
            nav={`/profile/${userId}`}
            text='Profile'
          />
          <button
            className='postButton'
            onClick={() => dispatch(setNewPost(!newPost))}
          >
            Postar
          </button>
        </aside>
        <Outlet />

        <aside>
          <button>
            Postar
          </button>
        </aside>
      </StyledOutlet>

      {newPost && <CreatePost />}

      {!newPost && (
        <StyledNewPost
          onClick={() => dispatch(setNewPost(!newPost))}
        >
          +
        </StyledNewPost>
      )}

      <Footer />
    </StyledLayout>
  );
}

export default Layout;
