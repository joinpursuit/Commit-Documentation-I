import React from "react";
import AlarmIcon from "@mui/icons-material/Alarm";
import "../styles/startAndEndTimeStyles.css";

const StartAndEndTimes = (props) => {
  const { start_time, end_time } = props;
  let startDateAndTime = start_time.split("T");
  let endDateAndTime = end_time.split("T");

  const convertTime = (isoTime) => {
    let hours = parseInt(isoTime.substring(0, 2), 10),
      minutes = isoTime.substring(3, 5),
      ampm = "am";

    if (hours == 12) {
      ampm = "pm";
    } else if (hours == 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
      ampm = "pm";
    }

    return <h3>{ampm}</h3>;
  };
  return (
    <div id="start-end-times-conatiner">
      <div key={start_time} className="time-container">
        <AlarmIcon />
        <h3 className="title">start time: </h3>
        <h3>
          {startDateAndTime[0]} {startDateAndTime[1].substring(0, 5)}{" "}
        </h3>
        {convertTime(startDateAndTime[1])}
      </div>
      <div key={end_time} className="time-container">
        <AlarmIcon />
        <h3 className="title">end time:</h3>
        <h3>
          {endDateAndTime[0]} {endDateAndTime[1].substring(0, 5)}{" "}
        </h3>
        {convertTime(endDateAndTime[1])}
      </div>
    </div>
  );
};

export default StartAndEndTimes;
