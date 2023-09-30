import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import SchoolLogoImage from './SchoolLogo.png';

// 모달 스타일
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: #fff;
  color: #000; /* 글자 색상을 설정합니다. */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: #00b0ff;
  color: black; /* 버튼의 텍스트 컬러를 설정합니다. */
  font-size: smaller;
  font-weight: bold;
  margin-left: 10px;
  width: 66px;
  height: 24px;
  border-radius: 10px;
`;

const BackgroundList = styled.div`
  width: 21.875rem;
  height: 6.4375rem;
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    rgba(31, 172, 233, 0.18) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 1px solid #0089ff;
  border-radius: 20px;
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 (선택 사항) */
  margin: 3rem;
`;

const Info = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 15.6px */
  letter-spacing: 0.25px;
  padding: 10px;
  width: 15rem;
  margin: 0px;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  margin: 30px;
`;

const LogoImage = styled.img`
  width: 10rem;
  height: 12em;
  flex-shrink: 0;
  margin: 3rem; 
`;

const CenteredText = styled.div`
  color: white;
  font-family: Nunito;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
  background:linear-gradient(180deg, #0AF 0%, #78D2FF 100%);
  padding: 7px; 
  border-radius: 10px;
`;


const CancelButton = styled.button`
  width: 5rem;
  height: 1.5rem;
  background-color: #00b0ff;
  color: #fff;
  font-size: smaller;
  font-weight: bold;
  margin-left: 10px;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: right; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 (선택 사항) */
  margin-right: 1rem;
  margin-top: -40px;
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
`;

function List(props) {
  const [currentDayReservations, setCurrentDayReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [showAllReservations, setShowAllReservations] = useState(false);
  const schoolNumber = localStorage.getItem("schoolnumber");
  const navigate = useNavigate();
  
  const goToMain = () => {
    navigate(`/reservation/${schoolNumber}`);
  };
  
  useEffect(() => {
    const schoolNumber = localStorage.getItem("schoolnumber");
    
    if (schoolNumber) {
      axios
        .get(`https://geostudyroom.store/myreservation/${schoolNumber}/`)
        .then((response) => {
          const reservations = response.data;
          
          // Filter current day reservations
          const currentDate = new Date().toISOString().split("T")[0];
          const currentDayReservations = reservations.filter(
            (reservation) => reservation.date === currentDate
          );
          
          setCurrentDayReservations(currentDayReservations);
          setAllReservations(reservations);
        })
        .catch((error) => {
          console.error("예약 데이터를 가져오는 중 오류 발생:", error);
        });
    }
  }, []);

  const handleCancelReservation = (roomName, date, clock) => {
    const schoolNumber = localStorage.getItem("schoolnumber");

    axios
      .delete(
        `https://geostudyroom.store/reservationdelete/${schoolNumber}/${roomName}/${date}/${clock}`
      )
      .then((response) => {
        console.log("예약이 취소되었습니다.");

        const updatedReservations = currentDayReservations.filter((reservation) => {
          return !(
            reservation.room === roomName &&
            reservation.date === date &&
            reservation.clock_times.includes(clock)
          );
        });

        setCurrentDayReservations(updatedReservations);
      })
      .catch((error) => {
        console.error("예약 취소 중 오류 발생:", error);
      });
  };

  const loadAllReservations = () => {
    setShowAllReservations(true);
  };

  return (
    <div>
      {currentDayReservations.length === 0 ? (
        <CenteredContainer>
          <LogoImage src={SchoolLogoImage} alt="School Logo" />
          <CenteredText>예약 목록이 없습니다.</CenteredText>
        </CenteredContainer>
      ) : (
        currentDayReservations.map((reservation, index) => (
          <ListContainer key={index}>
          <BackgroundList>
            <Info>
              신청자:{" "}
              {reservation.user
                ? reservation.user.schoolnumber
                : "데이터 없음"}{" "}
              {reservation.user ? reservation.user.name : ""}
              <br />
              스터디룸: {reservation.room ? reservation.room : "데이터 없음"}
              <br />
              날짜: {reservation.date ? reservation.date : "데이터 없음"}{" "}
              <br />
              시간:{" "}
              {reservation.clock_times
                ? reservation.clock_times.join(", ")
                : "데이터 없음"}
            </Info>
            <ButtonContainer>
              <CancelButton
                onClick={() =>
                  handleCancelReservation(
                    reservation.room,
                    reservation.date,
                    reservation.clock_times[0]
                  )
                }
              >
                예약 취소
              </CancelButton>
            </ButtonContainer>
          </BackgroundList>
        </ListContainer>
        ))
      )}

      {!showAllReservations && allReservations.length > currentDayReservations.length && (
        <CenteredContainer>
          <Button onClick={loadAllReservations}>더보기</Button>
        </CenteredContainer>
      )}

      {showAllReservations && (
        allReservations.map((reservation, index) => (
          <ListContainer key={index}>
          <BackgroundList>
            <Info>
              신청자:{" "}
              {reservation.user
                ? reservation.user.schoolnumber
                : "데이터 없음"}{" "}
              {reservation.user ? reservation.user.name : ""}
              <br />
              스터디룸: {reservation.room ? reservation.room : "데이터 없음"}
              <br />
              날짜: {reservation.date ? reservation.date : "데이터 없음"}{" "}
              <br />
              시간:{" "}
              {reservation.clock_times
                ? reservation.clock_times.join(", ")
                : "데이터 없음"}
            </Info>
          </BackgroundList>
        </ListContainer>
        ))
      )}

      <CenteredContainer>
        <Button onClick={goToMain}>예약하기</Button>
      </CenteredContainer>
    </div>
  );
}

export default List;
