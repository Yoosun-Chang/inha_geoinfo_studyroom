import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Top from "../top";
import Wave from "../Wave";
import axios from "axios";

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  height: 70vh; /* 뷰포트 높이를 100%로 설정하여 페이지 중앙에 위치하도록 합니다. */
`;

const Text1 = styled.div`
  color: #0089ff;
  font-family: Nunito;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.2px;
  text-align: center;
`;

const Text2 = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0.25px;
  text-align: center;
`;
const Button = styled.button`
  width: 150px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #0089ff;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
  transition: background-color 0.2s ease-in-out;
  text-align: center;
  line-height: 50px;
  border: none;
  margin-top: 50px;
`;

const Confirm = ({ reservationInfo }) => {
  const navigate = useNavigate();
  const schoolNumber = localStorage.getItem("schoolnumber");
  const admindate = localStorage.getItem("admindate");
  const time = localStorage.getItem("time");
  const Name = localStorage.getItem("Name");
  const [User, setUser] = useState([]);

  const goToMain = () => {
    navigate(`/reservation/${schoolNumber}`); // 메인 페이지 경로로 이동
  };

  useEffect(() => {
    axios
      .get(`https://geostudyroom.store/myreservation/${schoolNumber}/`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  }, []);
  console.log(User);

  return (
    <div>
      <Top />
      <TextContainer>
        <Text1>예약이 확정되었습니다!</Text1>
        <p />
        {User.length > 0 ? ( // User 배열이 비어 있지 않은 경우
          <>
            <Text2>예약자: {Name}</Text2>
            <Text2>날짜: {admindate}</Text2>
            <Text2>시간: {time}</Text2>
          </>
        ) : (
          <Text2>예약 정보를 불러오는 중입니다...</Text2>
        )}
        <Button onClick={goToMain}>뒤로</Button>
      </TextContainer>
      <Wave />
    </div>
  );
};

export default Confirm;
