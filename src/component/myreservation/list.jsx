import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  width: 10rem;
  margin: 0px;
`;

const Info2 = styled.div`
  color: #000;
  font-family: Poppins;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 15.6px */
  letter-spacing: 0.25px;
  padding: 50px;
  margin: 0px;
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
  margin-top: -40px;
`;

function List(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservationData, setReservationData] = useState([]);
  
  useEffect(() => {
    // localStorage에서 schoolnumber 가져오기
    const schoolNumber = localStorage.getItem('schoolnumber');

    // schoolNumber가 있을 경우에만 API 요청
    if (schoolNumber) {
      // 예약 데이터를 가져오는 Axios 요청
      axios
        .get(`https://geostudyroom.store/myreservation/${schoolNumber}/`)
        .then((response) => {
          const reservations = response.data;
          // 가져온 예약 데이터를 상태에 저장합니다.
          setReservationData(reservations);
        })
        .catch((error) => {
          console.error('예약 데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, []);

  const handleClick = () => {
    // 클릭 시 모달 열기
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // 모달 닫기
    setIsModalOpen(false);
  };

  const handleCancelReservation = (roomName, date, clock) => {
    // 예약 취소를 위한 API 요청을 보냅니다.
    const schoolNumber = localStorage.getItem('schoolnumber');

    axios
      .delete(`https://geostudyroom.store/reservationdelete/${schoolNumber}/${roomName}/${date}/${clock}`)
      .then((response) => {
        console.log('예약이 취소되었습니다.');
        // 예약이 취소되면 모달 닫기
        setIsModalOpen(false);
        // 예약 정보 초기화 (빈 배열로)
        setReservationData([]);
      })
      .catch((error) => {
        console.error('예약 취소 중 오류 발생:', error);
      });
  };

  return (
    <div>
      {reservationData.length === 0 ? (
        <Info2>예약 목록 없음</Info2>
      ) : (
        reservationData.map((reservation, index) => (
          <ListContainer key={index}>
            <BackgroundList>
              <Info>
                신청자: {reservation.user ? reservation.user.schoolnumber : '데이터 없음'}{' '}
                {reservation.user ? reservation.user.name : ''}<br />
                스터디룸: {reservation.room ? reservation.room : '데이터 없음'}<br />
                날짜: {reservation.date ? reservation.date : '데이터 없음'} <br />
                시간: {reservation.clock_times ? reservation.clock_times.join(', ') : '데이터 없음'}
              </Info>
              <ButtonContainer>
                <CancelButton onClick={() => handleClick(reservation.room, reservation.date, reservation.clock_times[0])}>예약 취소</CancelButton>
              </ButtonContainer>
            </BackgroundList>
          </ListContainer>
        ))
      )}

      {isModalOpen && (
        <ModalWrapper>
          <ModalContent>
            <p>예약을 취소하시겠습니까?</p>
            <ModalButton onClick={() => handleCancelReservation(reservationData[0].room, reservationData[0].date, reservationData[0].clock_times[0])}>확인</ModalButton>
            <ModalButton onClick={handleCloseModal}>취소</ModalButton>
          </ModalContent>
        </ModalWrapper>
      )}
    </div>
  );
}

export default List;