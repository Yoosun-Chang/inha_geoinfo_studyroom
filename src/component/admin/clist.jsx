import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  background: linear-gradient(180deg, rgba(31, 172, 233, 0.18) 0%, rgba(255, 255, 255, 0.00) 100%);
  border: 1px solid #0089FF;
  border-radius: 20px;
`;

const ListContainer = styled.div`
  display: flex; 
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 (선택 사항) */
  margin : 1.875rem;
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
  width: 10rem;
  margin: 0px;
  text-align: left !important;
`;

const CancelButton = styled.button`
  width: 5rem;
  height: 1.5rem;
  background-color: #00b0ff;
  color: #FFF;
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
margin-top:-20px;
`

function CList(props) {
  const admindate = localStorage.getItem("admindate");
  const adminRoom = "C";
  const [reservations, setReservations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    // 클릭 시 모달 열기
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  const handleCancelReservation = () => {
    // 예약 취소 동작을 여기에 추가
    console.log('예약이 취소되었습니다.');
    // 모달 닫기
    setIsModalOpen(false);
  };

  useEffect(() => {
    axios.get(`https://geostudyroom.store/reservationadmin/${adminRoom}/${admindate}/`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error('API 요청 중 오류 발생:', error);
      });
  }, [adminRoom, admindate]);

  console.log(reservations)
;
return (
  <div>
    {reservations.map((reservation) => (
      <ListContainer key={reservation.id}>
        <BackgroundList>
          <Info>
            신청자: {reservation.user ? reservation.user.name : '사용자 정보 없음'} <br />
          </Info>
          <Info>
            날짜: {reservation.date ? reservation.date : '날짜 정보 없음'} <br />
            시간: {reservation.clock_times ? reservation.clock_times.join(', ') : '시간 정보 없음'}
          </Info>

          <ButtonContainer>
            <CancelButton onClick={handleClick}>예약 취소</CancelButton>
          </ButtonContainer>
        </BackgroundList>

        {isModalOpen && (
          <ModalWrapper>
            <ModalContent>
              <p>예약을 취소하시겠습니까?</p>
              <ModalButton onClick={handleCancelReservation}>확인</ModalButton>
              <ModalButton onClick={handleCloseModal}>취소</ModalButton>
            </ModalContent>
          </ModalWrapper>
        )}
      </ListContainer>
    ))}
  </div>
);
}

export default CList;
