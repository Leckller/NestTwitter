import { Outlet } from 'react-router-dom';
import { StyledLayout } from './StyledLayout';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Layout() {
  return (
    <StyledLayout>
      <Header />
      <Outlet />
      <Footer />
    </StyledLayout>
  );
}

export default Layout;
