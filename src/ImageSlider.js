import { useState, useEffect } from "react";
import firstImage from "./images/sixth.jpeg";
import secondImage from "./images/second.jpeg";
import thirdImage from "./images/third.jpeg";
import fourthImage from "./images/fourth.jpeg";
import fifthImage from "./images/first.jpeg";
import back from "./svg/back.svg";
import forward from "./svg/forward.svg";
import SmallCircle from "./SmallCircle";
export default function ImageSlider() {
  const [images, setImages] = useState([
    firstImage,
    secondImage,
    thirdImage,
    fourthImage,
    fifthImage,
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [over, setOver] = useState(false);
  const [prev, setPrev] = useState(false);
  const [circleClick, setCircleClick] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (over) {
        setCurrentIndex((old) => (old + 1 < images.length ? old + 1 : 0));
        setOver(false);
      }
      if (circleClick) {
        setCircleClick(false);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [over]);
  function handleClick(index) {
    setCircleClick(true);
    if (index > currentIndex) {
      setCurrentIndex(index - 1 < 0 ? images.length - 1 : index - 1);
      setOver(true);
    } else {
      setCurrentIndex(index + 1 < images.length ? index + 1 : 0);
      setPrev(true);
    }
  }
  let idealIndex = 0;
  if (circleClick) {
    if (prev) {
      idealIndex = currentIndex - 1;
    } else {
      idealIndex = currentIndex + 1;
    }
  }
  let circleToDisplay = images.map((x, index) => (
    <SmallCircle
      click={(index) => handleClick(index)}
      index={index}
      currentImg={currentIndex}
      circleClick={circleClick}
      idealIndex={idealIndex}
    />
  ));

  let firstStyle, secondStyle;
  let thirdStyle, containerStyle;
  if (over) {
    firstStyle = {
      animation: "swiping 500ms ease-in-out",
      animationFillMode: "both",
    };
    if (circleClick) {
      secondStyle = {
        animation: "swiping3 500ms ease-in-out",
        animationFillMode: "both",
        display: "block",
      };
    } else {
      secondStyle = {
        animation: "swiping2 500ms ease-in-out",
        animationFillMode: "both",
        display: "block",
      };
    }
  } else {
    firstStyle = {};
    secondStyle = {
        display:"none"
    };
  }
  useEffect(() => {
    const interval2 = setInterval(() => {
      if (prev) {
        setCurrentIndex((old) => (old - 1 < 0 ? images.length - 1 : old - 1));
        setPrev(false);
      }
      if (circleClick) {
        setCircleClick(false);
      }
    }, 500);

    return () => clearInterval(interval2);
  }, [prev]);
  useEffect(()=>{
    const interval3=setInterval(()=>{
      setOver(true)
    },5000)
    return ()=>clearInterval(interval3)
  },[])

  if (prev) {
    firstStyle = {
      animation: "right 500ms ease-in-out",
      animationFillMode: "both",
    };
    thirdStyle = {
      animation: "right2 500ms ease-in",
      animationFillMode: "both",
    };
  } else {
    firstStyle = {};
    thirdStyle = {display:"none" };
  }
  if (circleClick) {
    firstStyle = { display: "none"};
  }
  return (
    <div style={containerStyle} className="container">
      <div className="img-div">
        <img
          style={thirdStyle}
          id="minus"
          src={
            images[currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1]
          }
          alt=""
        />
        <img id="first" style={firstStyle} src={images[currentIndex]} alt="" />
        <img
          id="second"
          style={secondStyle}
          src={images[currentIndex + 1 < images.length ? currentIndex + 1 : 0]}
          alt=""
        />
      </div>

      <div className="controller">
        <div className="changerParent">
          <img
            className="arrow"
            onClick={() => setPrev(true)}
            src={back}
            alt=""
          />
        </div>
        {circleToDisplay}
        <div className="changerParent" /*onClick={() => imageChange("go")}*/>
          <img
            className="arrow go"
            onClick={() => setOver(true)}
            /*onMouseEnter={()=>changeBackground()} onMouseLeave={()=>leave()}*/ src={
              forward
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
