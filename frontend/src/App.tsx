import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Layout from './components/Layout/Layout/Layout';
import { useAppSelector } from './hooks/reduxHooks';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Global from './pages/Global/Global';
import PostDetails from './pages/PostDetails/PostDetails';

function App() {
  const { token } = useAppSelector((s) => s.User);
  const navigate = useNavigate();

  useEffect(() => {
    if (token !== '') navigate('/');
  }, [token]);

  if (token === '') {
    return (
      <Routes>
        <Route path="/register" element={ <Register /> } />
        <Route path="/" element={ <Register /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="*" element={ <NotFound route="Register" /> } />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/" element={ <Home /> } />
        <Route path="/postDetails/:id" element={ <PostDetails /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/global" element={ <Global /> } />
      </Route>
      <Route path="/register" element={ <Register /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="*" element={ <NotFound route="Home" /> } />
    </Routes>
  );
}

export default App;
