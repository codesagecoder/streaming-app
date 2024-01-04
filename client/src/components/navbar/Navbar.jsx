import { ArrowDropDown, Dehaze, Notifications, Search } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import "./navbar.scss";

const TABLET_SIZE = 885;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY > 0);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img src={logo} alt="logo" />
          </Link>
          {screenWidth > TABLET_SIZE && (
            <>
              <Link to="/" className="link">
                <span>Home</span>
              </Link>
              <span>New and Popular</span>
              <span>My List</span>
            </>
          )}
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
        </div>
        <div className="right">
          {screenWidth > TABLET_SIZE && (
            <>
              <Search className="icon" />
              <span>{JSON.parse(localStorage.getItem("user")).username}</span>
              <Notifications className="icon" />
            </>
          )}
          <div className="profile">
            {screenWidth > TABLET_SIZE ? (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={avatar} alt="" />
                <ArrowDropDown className="icon" />
              </div>
            ) : (
              <Dehaze className="icon mobile-icon" />
            )}
            <div className="options">
              {screenWidth > TABLET_SIZE && <span>Settings</span>}
              {screenWidth < TABLET_SIZE && (
                <>
                  <span style={{ display: "flex", alignItems: "center", gap: '8px' }}>
                    <img src={avatar} alt="" /> settings
                  </span>
                  <span>New and Popular</span>
                  <span>My List</span>
                  <span>Notifications</span>
                </>
              )}
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
