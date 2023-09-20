import React, { useState } from "react";
import styled from "styled-components";
import ConfirmButton from "./confirmbtn";
import axios from "axios";

function All() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const schoolNumber = localStorage.getItem("schoolnumber");
  const Room = localStorage.getItem("Room");
  const year = localStorage.getItem("Year");
  const month = localStorage.getItem("Month");
  const time = localStorage.getItem("Time");
  const day = localStorage.getItem("Day");

  // Year, Month, Day를 하나의 날짜 문자열로 합치기
  const date = `${year}-${month}-${day}`;
  console.log(date);
  console.log(Room);
  console.log(time);
  return <div></div>;
}

export default All;
