import React from 'react';
import ButtomArrowIcon from './../../images/buttom-arrow.png';
import CircleIconWithClose from './../../images/icon-circle-with-close.svg';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { participants, floorsWithMeetingRooms } from '../../constants.js';
import { Context } from "../../context";

const CreateNewMeetField = () => {
    const { state, dispatch } = React.useContext(Context);

    console.log(' debug, context ', state);
    return (
      <form action="" className="main__new-meet-create">
        <div className="new-meet-create__form-content" >
        <img
          onClick={''}
          src={CircleIconWithClose} alt=""
          className="new-meet-create__circle-icon-with-close"
        />
        <div className="new-meet-create__text">New meet</div>
        <label htmlFor="meet-title" className="new-meet-create__label-theme">
          Theme
        </label>
        <input
          id="meet-title"
          type="text"
          className="new-meet-create__meet-title"
          placeholder="What are you going to talk about?"
        />
        <label htmlFor="meet-date" className="new-meet-create__label-date">
          Date
        </label>
        </div>
      </form>
    )
}

export default CreateNewMeetField;
