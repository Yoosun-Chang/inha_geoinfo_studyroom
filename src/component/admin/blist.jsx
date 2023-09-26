import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  color: #000;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const ModalButton = styled.button`
  background-color: #00b0ff;
  color: black;
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
  justify-content: center;
  align-items: center;
  margin: 1.875rem;
`;

const Info = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: 0.25px;
  padding: 10px;
  width: 10rem;
  margin: 0px;
  text-align: left !important;
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
  justify-content: flex-end;
  align-items: center;
  margin-right: 1rem;
  margin-top: -20px;
`;

function BList(props) {
  const admindate = localStorage.getItem("admindate");
  const adminRoom = "B";
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationData, setReservationData] = useState(null); // 예약 데이터 상태 추가

  const handleClick = (reservation) => {
    // 클릭 시 모달 열기
    setIsModalOpen(true);
    // 모달을 열 때 해당 예약 데이터를 설정
    setReservationData(reservation);
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  const handleCancelReservation = (date, clock) => {
    // 예약 취소를 위한 API 요청을 보냅니다.
    const schoolNumber = localStorage.getItem("schoolnumber");

    axios
      .delete(
        `https://geostudyroom.store/reservationadmin/B/${date}/${clock}/`
      )
      .then((response) => {
        console.log("예약이 취소되었습니다.");
        // 예약이 취소되면 모달 닫기
        setIsModalOpen(false);
        // 예약 정보를 업데이트하여 삭제된 예약을 제외하고 보여줍니다.
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) =>
              reservation.date !== date || reservation.clock_times[0] !== clock
          )
        );
      })
      .catch((error) => {
        console.error("예약 취소 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://geostudyroom.store/reservationadmin/B/${admindate}/`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  }, [adminRoom, admindate]);

  console.log(reservations);

  return (
    <div>
      {reservations.map((reservation) => (
        <ListContainer key={reservation.id}>
          <BackgroundList>
            <Info>
              신청자:{" "}
              {reservation.user ? reservation.user.name : "사용자 정보 없음"}{" "}
              <br />
            </Info>
            <Info>
              날짜: {reservation.date ? reservation.date : "날짜 정보 없음"}{" "}
              <br />
              시간:{" "}
              {reservation.clock_times
                ? reservation.clock_times.join(", ")
                : "시간 정보 없음"}
            </Info>
            <ButtonContainer>
              <CancelButton onClick={() => handleClick(reservation)}>
                예약 취소
              </CancelButton>
            </ButtonContainer>
          </BackgroundList>
          {isModalOpen && reservationData === reservation && (
            <ModalWrapper>
              <ModalContent>
                <p>예약을 취소하시겠습니까?</p>
                <ModalButton
                  onClick={() =>
                    handleCancelReservation(
                      reservation.date,
                      reservation.clock_times[0]
                    )
                  }
                >
                  확인
                </ModalButton>
                <ModalButton onClick={handleCloseModal}>취소</ModalButton>
              </ModalContent>
            </ModalWrapper>
          )}
        </ListContainer>
      ))}
    </div>
  );
}

export default BList;
