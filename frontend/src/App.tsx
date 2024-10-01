import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import NotFound from './routes/NotFound';
import { useAppSelector } from './hooks/reduxHooks';
import Register from './routes/Register';
import Login from './routes/Login';

function App() {
  const { User: { token } } = useAppSelector((s) => s);

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
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
