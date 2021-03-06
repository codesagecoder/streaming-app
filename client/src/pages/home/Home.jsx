import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { logout } from "../../authContext/AuthActions";
import { AuthContext } from "../../authContext/AuthContext";

const Home = ({ type, user }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        if (err.response.status === 403) {
          dispatch(logout());
        }
      }
    };
    getRandomLists();
  }, [type, genre, user.accessToken, dispatch]);
  return (
    <div className="home">
      {lists.length > 0 && [
        <Navbar key={0} />,
        <Featured key={1} type={type} setGenre={setGenre} />,
      ]}
      {lists.map((list, i) => (
        <List list={list} key={i} />
      ))}
    </div>
  );
};

export default Home;
