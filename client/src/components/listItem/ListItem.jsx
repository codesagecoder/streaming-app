import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./listItem.scss";


export default function ListItem({ index, item, slideNumber }) {
  const [movie, setMovie] = useState({});
  const [hoveredState, setHoveredState] = useState(0);

  function shouldMakeAdjustment() {
    // itemPosition = (index * 225 - 50) + (index * 2.5)
    //amountSlided =slide-size(230) * slide-number
    //20 margin
    //positionInScreen = itemPosition + margin - amountSlided
    //50 arrowLeft
    //endOfItem = 50 + PositionInScreen + itemWidth(325 || window.innerWidth * (70/100) )
    //endOfItem > window.innerWidth
    //then
    //adjustment
    //(endOfItem - window.innerWidth) - 10
    // const adjustmentRef = useRef()
    let mobileWidth =
      window.innerWidth <= 480 ? window.innerWidth * (70 / 100) : undefined;
    let itemPosition = index * 225 - 50 + index * 2.5;
    let amountSlided = 230 * slideNumber;
    let positionInScreen = itemPosition + 20 - amountSlided;
    let endOfItem = positionInScreen + (mobileWidth || 325);
    if (endOfItem + 50 >= window.innerWidth) {
      let diff = 65 + endOfItem - window.innerWidth;
      return itemPosition - diff;
    } else {
      return itemPosition;
    }
  }

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("/api/movies/find/" + item, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);
  return (
    <div
      onTouchStart={() => {
        setHoveredState(shouldMakeAdjustment());
      }}
      onMouseEnter={() => {
        if (hoveredState === 0) {
          setHoveredState(shouldMakeAdjustment());
        }
      }}
      className="listItem"
      style={{ left: hoveredState }}
    >
      <img src={movie.imgSm} alt="" />
      {hoveredState !== 0 && (
        <div className="media-info">
          <video src={movie.trailer} autoPlay={true} loop muted />
          <div className="itemInfo">
            <div className="icons">
              <Link className="link" to="/watch" state={movie}>
                <PlayArrow className="icon" />
              </Link>
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.desc?.slice(0, 75)}...</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </div>
      )}
    </div>
  );
}
