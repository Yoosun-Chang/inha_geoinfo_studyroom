import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ConfirmButton from "./confirmbtn";
import axios from "axios";

function Btime() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [timeData, setTimeData] = useState({});
  const schoolNumber = localStorage.getItem("schoolnumber");
  const Room = localStorage.getItem("Room");
  const year = localStorage.getItem("Year");
  let month = localStorage.getItem("Month");
  const day = localStorage.getItem("Day");
  
  // 월을 두 자리로
  if (month < 10) {
    month = `0${month}`;
  }
  
 // Year, Month, Day를 하나의 날짜 문자열로 합침
 const date = `${year}-${month}-${day}`;
 console.log(date);
 localStorage.setItem("admindate", date);

  useEffect(() => {
    axios.get(`https://geostudyroom.store/reservationtable/B/${date}/`)
      .then((response) => {
        setTimeData(response.data.time);
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  }, [date]);

  const handleTimeClick = (time) => {
    console.log("클릭된 시간:", time);
    console.log("timeData[time]:", timeData[time]);
    console.log("selectedTimes:", selectedTimes);
    // 시간 선택 가능한지 확인 (true로 표시되지 않았는지)
    if (!timeData[time]) {
      if (selectedTimes.includes(time)) {
        setSelectedTimes(selectedTimes.filter((t) => t !== time));
      } else {
        if (selectedTimes.length < 4) {
          setSelectedTimes([...selectedTimes, time]);
        }
      }
    }
  };

  const buttonStyle = {
    width: "5.3125rem",
    height: "1.875rem",
    flexShrink: 0,
    borderRadius: "50px",
    background: "linear-gradient(180deg, #0AF 0%, #78D2FF 100%)",
    margin: "1.25rem 1.25rem 0rem 1.25rem",
    border: "none",
    color: "white",
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
  };

  const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `;

const selectedButtonStyle = {
  background: "#0089FF",
  cursor:  "pointer",
  opacity: 0.5,
};

  localStorage.setItem("Time", JSON.stringify(selectedTimes));
  localStorage.setItem("time", selectedTimes);
  const localTime = localStorage.getItem("Time");

  return (
    <div className="time-container">
      <BtnContainer>
        {Object.keys(timeData).map((time, index) => (
          <button
          key={index}
          style={{
            ...buttonStyle,
            ...(selectedTimes.includes(time) ? selectedButtonStyle : {
            cursor: timeData[time] ? "not-allowed" : "pointer",
            opacity: timeData[time] ? 0.5 : 1,
            }),
            background: timeData[time] ? "grey" :" #0089FF",
          }}
          onClick={() => handleTimeClick(time)}
          disabled={timeData[time]}
        >
          {time}
        </button>
        ))}
      </BtnContainer>
      <ConfirmButton />
    </div>
  );
}

export default Btime;
