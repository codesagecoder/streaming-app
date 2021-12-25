import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './authContext/AuthContext'

const App = () => {
  const {user} = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"))
  return (
    <Router>
      <Switch>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        <Route exact path="/">{user ? <Home user={user} /> : <Redirect to="/register" />}</Route>
        {user && (
          <>
            <Route path="/movies">
             
              <Home type="movie" user={user} />
            </Route>
            <Route path="/series">
              <Home type="series" user={user} />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
