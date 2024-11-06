import { Outlet } from 'react-router-dom';
import { StyledLayout } from './StyledLayout';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { StyledNewPost } from './StyledNewPost';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { setNewPost } from '../../../redux/Reducers/Post';

function Layout() {
  const dispatch = useAppDispatch();

  return (
    <>
      <Header />
      <StyledLayout>
        <Outlet />
      </StyledLayout>
      <StyledNewPost
        onClick={ () => dispatch(setNewPost(true)) }
      >
        +
      </StyledNewPost>
      <Footer />
    </>
  );
}

export default Layout;
