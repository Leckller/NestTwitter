import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import { useAppSelector } from './hooks/reduxHooks';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import PostDetails from './pages/PostDetails/PostDetails';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';
import Configs from './pages/Configs/Configs';
import Layout from './components/Layout/Layout';

function App() {
  const { token } = useAppSelector((s) => s.User);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== '') navigate('/');
  }, [token]);

  if (token === '') {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound route="Register" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/postDetails/:id" element={<PostDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/config" element={<Configs />} />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound route="home" />} />
    </Routes>
  );
}

export default App;
