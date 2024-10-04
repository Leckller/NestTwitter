import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, Login, NotFound, Profile, Register, Search } from './routes';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { setToken } from './redux/Reducers/User';

function App() {
  const { User: { token } } = useAppSelector((s) => s);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const localToken = localStorage.getItem('nToken')!;
    const localUser = JSON.parse(localStorage.getItem('nUser')!);

    if (localToken !== '') {
      dispatch(setToken({token: localToken, user: localUser}));
    }
  }, []);

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/profile/:address" element={ <Profile /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
