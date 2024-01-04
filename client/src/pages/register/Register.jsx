import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { login } from "../../authContext/apiCalls";

import logo from '../../assets/logo.png';
import "./register.scss";

export default function Register() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const { dispatch } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    if (emailRef.current.value) setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      if (!username && !password) throw Error('Missing fields');

      await axios.post("/api/auth/register", { email, password, username });
      login({ email, password }, dispatch);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="top">
        <img
          className="logo"
          src={logo}
          alt=""
        />
        <button
          onClick={() => nav('/login')}
          className="loginButton"
        >
          Sign In
        </button>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input form-input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <input type="text" placeholder="username" ref={usernameRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
