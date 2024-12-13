import { StyledLayout } from './Styles/StyledLayout';
import Footer from '../Footer/Footer';
import { useAppSelector } from '../../hooks/reduxHooks';
import CreatePost from '../CreatePost/CreatePost';
import OutletComponent from './OutletComponent';
import NewPostButton from './NewPostButton';

function Layout() {
  const { newPost } = useAppSelector((s) => s.Post);

  return (
    <StyledLayout>

      <OutletComponent />

      {newPost && <CreatePost />}

      <NewPostButton />

      <Footer />

    </StyledLayout>
  );
}

export default Layout;
