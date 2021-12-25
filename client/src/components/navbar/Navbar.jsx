import {
  ArrowDropDown,
  Notifications,
  Search,
  Dehaze,
} from "@material-ui/icons";
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";
import "./navbar.scss";

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
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/" className="link">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt=""
            />
          </Link>
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          {screenWidth > 480 && (
            <>
              <Link to="/series" className="link">
                <span className="navbar-main-links">Series</span>
              </Link>
              <Link to="/movies" className="link">
                <span className="navbar-main-links">Movies</span>
              </Link>
            </>
          )}

          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          {screenWidth > 480 && (
            <>
              <span>{JSON.parse(localStorage.getItem("user")).username}</span>
              <Notifications className="icon" />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/firstapp-f0082.appspot.com/o/no-user.jpg?alt=media&token=7c680fad-b0a6-4869-b908-3f92b74ea045"
                alt=""
              />
            </>
          )}
          <div className="profile">
            {screenWidth > 480 ? (
              <ArrowDropDown className="icon" />
            ) : (
              <Dehaze className="icon" />
            )}
            <div className="options">
              {screenWidth > 480 && <span>Settings</span>}
              {screenWidth < 480 && (
                <>
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/firstapp-f0082.appspot.com/o/no-user.jpg?alt=media&token=7c680fad-b0a6-4869-b908-3f92b74ea045"
                      alt=""
                    />
                    <span>settings</span>
                  </span>
                  <span>Notifications</span>
                  <span className="navbar-main-links">
                    <Link to="/series" className="link">
                      Series
                    </Link>
                  </span>
                  <span className="navbar-main-links">
                    <Link to="/movies" className="link">
                      Movies
                    </Link>
                  </span>
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
