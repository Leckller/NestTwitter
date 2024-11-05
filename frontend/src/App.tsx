import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Layout from './components/Layout/Layout/Layout';
import { useAppSelector } from './hooks/reduxHooks';
import { useEffect } from 'react';
import Register from './pages/Register/Register';

function App() {
  const { token } = useAppSelector(s => s.User)
  const navigate = useNavigate()

  useEffect(() => {

    if (token === '') navigate('/register')

  }, [token])

  if (token === '') return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
