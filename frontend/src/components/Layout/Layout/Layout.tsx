import { Outlet } from 'react-router-dom';
import { StyledLayout } from './StyledLayout';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { StyledNewPost } from './StyledNewPost';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { setNewPost } from '../../../redux/Reducers/Post';
import CreatePost from '../CreatePost/CreatePost';

function Layout() {
  const dispatch = useAppDispatch();
  const { newPost } = useAppSelector((s) => s.Post);

  return (
    <StyledLayout>
      <Header />
      <Outlet />
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
