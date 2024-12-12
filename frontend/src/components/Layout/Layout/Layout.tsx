import { Outlet, useLocation } from 'react-router-dom';
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
import FormSearch from '../../../pages/Search/FormSearch';
import { FaSearch } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

function Layout() {
  const dispatch = useAppDispatch();
  const { newPost } = useAppSelector((s) => s.Post);
  const { userId } = useAppSelector((s) => s.User);
  const { pathname } = useLocation();

  return (
    <StyledLayout>


      <StyledOutlet>
        <aside>
          <section>
            <NavigateButtons
              Icon={<IoHomeOutline className='icon' />}
              local='bubble'
              nav={"/home"}
              text='Home'
            />
            <NavigateButtons
              Icon={<FaSearch className='icon' />}
              local='searchPosts'
              nav={'/search'}
              text='Search'
            />
            <NavigateButtons
              Icon={<IoPersonOutline className='icon' />}
              local='profile'
              nav={`/profile/${userId}`}
              text='Profile'
            />
            <NavigateButtons
              Icon={<FaGear className='icon' />}
              local='global'
              nav={'/config'}
              text='configurations'
            />
            <button
              className='postButton'
              onClick={() => dispatch(setNewPost(!newPost))}
            >
              Postar
            </button>
          </section>
        </aside>

        <div>
          <Header />
          <Outlet />
        </div>

        <aside>
          {!pathname.includes('search') && <FormSearch />}
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
