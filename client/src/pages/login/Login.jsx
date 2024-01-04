import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/apiCalls";

import logo from '../../assets/logo.png';
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext)


  function handleLogin(e){
    e.preventDefault();
  login({email,password}, dispatch)
  }
  return (
    <div className="login">
          <img
            className="logo"
            src={logo}
            alt=""
          />
      
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" onChange={e=>setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
          <button onClick={handleLogin}>Sign In</button>
          <button type="button" className="demoButton" onClick={()=>{}}>Demo User</button>
          <span>
            New to Netflix? <Link to="/register"><b>Sign up now.</b></Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you&apos;re not a
            bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
