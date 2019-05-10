import React, { useState, useEffect } from "react";
import GPIcon from "./images/gp-icon.svg";
import RightArrow from "./images/right-pointing-arrow.png";
import LeftArrow from "./images/left-pointing-arrow.png";
import CloseButton from "./images/close.svg";
import { meetingRooms, floorsWithMeetingRooms } from "./constants.js";
import CreateNewMeetField from "./Components/Create-New-Meet-Field"

import { Context } from "./context";

function App() {
  const { state, dispatch } = React.useContext(Context);

  const [isClicked, toggleIsClicked] = useState(false),
    [timeNow, setTimeNow] = useState(new Date()),
    [isHiddenPopup, toggleIsHiddenPopup] = useState(false),
    [moreInfoPopup, toggleMoreInfoPopup] = useState(false),
    q = document.querySelector.bind(document);

  useEffect(() => {
    document.addEventListener("mouseup", () => {
      toggleIsClicked(!isClicked);
    });
    let offsetForVerticalTimeLine =
      (new Date().getHours() - 8) * 76 + (75 / 60) * new Date().getMinutes();
    console.log(
      " debug main__vertical-line : ",
      offsetForVerticalTimeLine,
      new Date().getHours() - 7
    );
    q(".main__vertical-line").style.left = offsetForVerticalTimeLine + "px";
    q(".main__time-now").style.left = offsetForVerticalTimeLine - 22 + "px";

    const timerId = setInterval(() => setTimeNow(new Date()), 60 * 1000);

    return () => {
      clearInterval(timerId);
    };
  });

  const toggleWindowShow = () => dispatch({ type: "TOGGLE_WINDOW_SHOW" });

  return (
    <div className="basicLayout">
      <header className="header">
        <img
          className="header__gp-icon"
          src={GPIcon}
          width="50"
          height="50"
          alt=""
        />
        <div className="header__text">Meetings</div>
        {/*<input className="header__order-pass-if-forgot-someone"></input>*/}
        <button className="header__button-create-meeting" onClick={toggleWindowShow}>
          { state.newMeetWindowShown ? 'cancel meet' : 'new meet' }
        </button>
      </header>
      <div className="main">
        { state.newMeetWindowShown && <CreateNewMeetField/>} {console.log(' debug context : ', state.newMeetWindowShown)}
        <div className="main__date-picker">
          <div className="date-picker__date-today">
            <img className="date-picker__arrows" src={LeftArrow} alt="" />
            <span>
              {timeNow.getDate() +
                " " +
                timeNow
                  .toDateString()
                  .split(" ")[1]
                  .toLowerCase()}{" "}
              • Today
            </span>
            <img className="date-picker__arrows" src={RightArrow} alt="" />
          </div>
          <div className="date-picker__hours">
            {Array.apply(null, { length: 16 }).map((el, i) => (
              <span key={i + 8} className="date-picker__hour">
                {i + 8}
              </span>
            ))}
          </div>
        </div>

        <div className="main__meeting-rooms">
          {floorsWithMeetingRooms.map(el => (
            <React.Fragment key={el.floor}>
              <p className="meeting-rooms__floor">{el.floor + " floor"}</p>
              <ul>
                {el.meetingRooms.map(el => (
                  <li key={el.room}>
                    <p>{el.room}</p>
                    {el.capacityMax ? (
                      <p>{`from ${el.capacity} to ${el.capacityMax} people`}</p>
                    ) : (
                      <p>{`up to ${el.capacity} people`}</p>
                    )}
                  </li>
                ))}
              </ul>
            </React.Fragment>
          ))}
        </div>
        <div className="meeting-schedule">
          <div className="main__time-now">
            {timeNow.toTimeString().slice(0, 5)}
          </div>
          <div className="main__vertical-line" />
          {Array.apply(null, { length: 136 }).map((el, i) => (
            <div key={i}>
              <progress value="0" max="100" className={"box number" + i} />
              <div className={"plus-box plus" + i} tabIndex="0">
                {" "}
                {/* tabIndex need for working onBlur https://webaim.org/techniques/keyboard/tabindex */}
                <div className={"box__plus-h horizontal" + i} />
                <div className={"box__plus-v vertical" + i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
