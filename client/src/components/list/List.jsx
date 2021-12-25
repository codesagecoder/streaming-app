import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({ list }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [clickLimit, setClickLimit] = useState(window.innerWidth / 230); //width of screen, 230 item width: ;
  const listRef = useRef();
  useEffect(() => {
    let resizeWindow = () => {
      setWindowWidth(window.innerWidth);
      setClickLimit( window.innerWidth/ 230);
    };
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [windowWidth]);

  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      slideNumber <= 1 && setIsMoved(false);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (
      direction === "right" &&
      slideNumber < list.content.length - clickLimit
    ) {
      setIsMoved(true);
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem slideNumber={slideNumber} key={i} index={i} item={item} windowWidth={windowWidth} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
          style={{
            display: slideNumber >= list.content.length - clickLimit && "none",
          }}
        />
      </div>
    </div>
  );
}