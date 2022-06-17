import { useState } from "react";
export default function SmallCircle({ index, currentImg,click,circleClick,idealIndex}) {
    function clickLocal(){
        click(index)
    }
  function whatToDisplay() {
    if ((index === parseInt(currentImg))&&!circleClick) {
      return <div onClick={clickLocal}className="circle current">&nbsp;</div>;
    } else if(circleClick){
      if(index === parseInt(idealIndex)){
        return <div onClick={clickLocal}className="circle current">&nbsp;</div>;
      }else{
        return <div onClick={clickLocal} className="circle">&nbsp;</div>;
      }
    }
    else {
      return <div onClick={clickLocal} className="circle">&nbsp;</div>;
    }
  }
  return whatToDisplay();
}
