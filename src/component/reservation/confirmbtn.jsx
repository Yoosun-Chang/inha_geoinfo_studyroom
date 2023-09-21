import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 20px;
  border-radius: 5px;
  color: black;
`;

const ConfirmButtonContainer = styled.div`
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
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

function ConfirmButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const schoolNumber = localStorage.getItem("schoolnumber");
  const Room = localStorage.getItem("Room");
  const year = localStorage.getItem("Year");
  const month = localStorage.getItem("Month");
  const day = localStorage.getItem("Day");
  const date = `${year}-${month}-${day}`;
  const localTime = localStorage.getItem("Time");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAgree = () => {
    setAgreed(!agreed);
  
    if (!agreed) {
      // 동의합니다 체크박스가 체크되었을 때 /confirm 경로로 이동
      navigate(`/confirm/${schoolNumber}`);
  
      // Make the axios POST request here
      axios
      .post(`https://geostudyroom.store/reservationadd/${schoolNumber}/`, {
        "room": Room,
        "date": date,
        "clock": JSON.parse(localTime) // localTime을 JSON 배열로 파싱
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("POST 요청 성공");
          console.log(response.data);
          console.log(localTime); // 요청이 성공한 후에 선택한 시간 찍
        } else {
          console.log("POST 요청 실패");
        }
      })
      .catch((error) => {
        console.error("POST 요청 에러:", error);
        
        console.log({
          room: Room,
          date: date,
          clock: JSON.parse(localTime) // localTime을 JSON 배열로 파싱
        });
      });
    
    
    }
  };

  return (
    <>
      <CenteredContainer>
        <ConfirmButtonContainer onClick={togglePopup}>
          예약확정
        </ConfirmButtonContainer>
      </CenteredContainer>
      {showPopup && (
        <PopupContainer>
          <CenteredContainer>
            <h2>이용 규칙</h2>
            <p>
              1. 1명 또는 2명 이용을 제한하지 않습니다. (줌 회의, 면접 준비 등)
              1명 또는 2명 이용자는 예약 없이 빈 시간대에 이용해주세요. 대신,
              예약이 발생하면 바로 비켜주세요.
            </p>
            <p>
              2. 음료수, 간단한 다과의 취식은 허용합니다. 그러나 냄새가 나는
              식사류의 취식은 제한합니다. 환기가 어려운 구조입니다.
            </p>
            <p>3. 쓰레기와 지우개가루, 칠판을 정리한 후 퇴실해주세요.</p>
            <p>
              4. 칠판 또는 책상을 닦을 때는 입구에 비치된 알코올을 이용해주세요.
            </p>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                checked={agreed}
                onChange={handleAgree}
              />
              동의합니다
            </CheckboxLabel>
          </CenteredContainer>
        </PopupContainer>
      )}
    </>
  );
}

export default ConfirmButton;



