import React, { useState } from 'react';
import styled from 'styled-components';
import Weekcal from '../component/reservation/weekcal';
import RoomBtn from '../component/reservation/roombtn';

const Container = styled.div`
  display: flex;
  align-items: center; 
  justify-content: space-between;
`;


function Reservation() {
  // Weekcal 컴포넌트에서 선택한 날짜를 관리하는 상태
  const [selectedDate, setSelectedDate] = useState(null);

  // Weekcal 컴포넌트에서 호출되는 함수로 선택한 날짜를 처리
  const handleDateClick = (selectedDateString) => {
    setSelectedDate(selectedDateString);
  };

  // 선택한 날짜가 당일 또는 다음날인지를 확인하는 함수
  function isToday(dateString) {
    const now = new Date();
    const today = now.getDate();

    const selectedDay = parseInt(dateString.split(' ')[2]);
    return selectedDay === today;
  }

  function isTomorrow(dateString) {
    const now = new Date();
    const today = now.getDate();
    
    // 다음 날을 계산하기 위해 오늘 날짜에 1을 더합니다.
    const tomorrow = today + 1;

    const selectedDay = parseInt(dateString.split(' ')[2]);
    return selectedDay === tomorrow;
  }

  return (
    <div>
      <Weekcal onDateClick={handleDateClick} />
      {selectedDate && (
        <div>
          {isToday(selectedDate) && (
            <div>
                <Container>
              <RoomBtn />
              </Container>
            </div>
          )}
          {isTomorrow(selectedDate) && (
            <div>
                <Container>
              <RoomBtn />
              </Container>
            </div>
          )}
          <div className="SelectedDate">
            {selectedDate}
          </div>
        </div>
      )}
    </div>
  );
}

export default Reservation;
