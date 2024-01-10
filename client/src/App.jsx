import { useContext } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthContext } from './authContext/AuthContext';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import NotFound from "./pages/404";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Router to='/login' allow={!!user} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/movies" element={<Home type="movie" user={user} />} />
          <Route path="/series" element={<Home type="series" user={user} />} />
          <Route path="/watch" element={<Watch />} />
        </Route>

        <Route element={<Router to='/' allow={!user} />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function Router({ allow, to }) {
  return (
    allow ? <Outlet /> : <Navigate to={to} />
  );
}

export default App;
