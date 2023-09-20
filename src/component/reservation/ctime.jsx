import React, { useState } from "react";
import styled from "styled-components";
import ConfirmButton from "./confirmbtn";
import axios from "axios";
function Ctime() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const schoolNumber = localStorage.getItem("schoolnumber");
  const Room = localStorage.getItem("Room");
  const year = localStorage.getItem("Year");
  const month = localStorage.getItem("Month");
  const day = localStorage.getItem("Day");

  // Year, Month, Day를 하나의 날짜 문자열로 합치기
  const date = `${year}-${month}-${day}`;
  console.log(date);

  // 시간대 목록 수정해야함
  const timeSlots = [
    "09:00am",
    "09:30am",
    "10:00am",
    "10:30am",
    "11:00am",
    "11:30am",
    "12:00pm",
    "12:30pm",
    "01:00pm",
    "01:30pm",
    "02:00pm",
    "02:30pm",
    "03:00pm",
    "03:30pm",
    "04:00pm",
    "04:30pm",
    "05:00pm",
    "05:30pm",
    "06:00pm",
    "06:30pm",
    "07:00pm",
    "07:30pm",
    "08:00pm",
    "08:30pm",
    "09:00pm",
    "09:30pm",
    "10:00pm",
    "10:30pm",
    "11:00pm",
    "11:30pm",
    "12:00am",
    "12:30am",
    "01:00am",
    "01:30am",
    "02:00am",
    "02:30am",
    "03:00am",
    "03:30am",
    "04:00am",
    "04:30am",
    "05:00am",
    "05:30am",
    "06:00am",
    "06:30am",
    "07:00am",
    "07:30am",
    "08:00am",
    "08:30am",
  ];

  // 시간대를 클릭할 때 호출되는 함수
  const handleTimeClick = (time) => {
    // 이미 클릭된 시간대인지 확인
    console.log(time);
    if (selectedTimes.includes(time)) {
      // 이미 클릭된 시간대면 선택 해제
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      // 선택되지 않은 시간대면 선택
      // 최대 2개까지 선택할 수 있도록 제한
      if (selectedTimes.length < 4) {
        setSelectedTimes([...selectedTimes, time]);
      }
    }
    console.log(selectedTimes);
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
  };

  const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `;

  const Text = styled.div`
    color: #000;
    font-family: Nunito;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left: 1.25rem;
  `;

  const selectedButtonStyle = {
    background: "#0089FF",
  };

  localStorage.setItem("Time", JSON.stringify(selectedTimes));
  const localTime = localStorage.getItem("Time");
  axios
    .post(`https://geostudyroom.store/reservationadd/${schoolNumber}`, {
      room: Room,
      date: date,
      clock: localTime,
    })
    .then((response) => {
      if (response.status === 200) {
        console.log("POST 요청 성공");
        console.log(response.data);
        console.log(selectedTimes); // 요청이 성공한 후에 선택한 시간 찍
      } else {
        console.log("POST 요청 실패");
      }
    })
    .catch((error) => {
      console.error("POST 요청 에러:", error);
    });

  return (
    <div className="time-container">
      <BtnContainer>
        {timeSlots.map((time, index) => (
          <button
            key={index}
            style={{
              ...buttonStyle,
              ...(selectedTimes.includes(time) ? selectedButtonStyle : {}),
            }}
            onClick={() => handleTimeClick(time)}
          >
            {time}
          </button>
        ))}
      </BtnContainer>
      <ConfirmButton />
    </div>
  );
}

export default Ctime;
