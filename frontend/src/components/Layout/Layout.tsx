import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const { pathname } = useLocation();

  const isValidRouteForHeader = () => {
    if (pathname.includes('search')) return false;
    return !(pathname.includes('profile'));
  };

  return (
    <div className="flex flex-col justify-between h-screen w-screen">
      {isValidRouteForHeader() && (<Header />)}
      <main className="overflow-y-scroll w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
