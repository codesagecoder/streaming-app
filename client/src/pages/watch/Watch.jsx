import { ArrowBackOutlined } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.state;

  return (
    <div className="watch">
      <Link to="/" className="back">
        <ArrowBackOutlined /> Home
      </Link>
      <video
        className="video"
        autoPlay
        controls
        src={movie.video}
      />
    </div>
  );
}
