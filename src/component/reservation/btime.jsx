import React, { useState } from 'react';
import styled from 'styled-components';

function Btime() {
  // 클릭된 시간대를 관리하는 상태
  const [selectedTimes, setSelectedTimes] = useState([]);

  // 시간대 목록
  const timeSlots = [
    '9:00 am', '10:00 am', '11:00 am', '12:00 am',
    '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm',
    '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm',
    '9:00 pm', '10:00 pm', '11:00 pm', '12:00 am',
    '1:00 am', '2:00 am', '3:00 am', '4:00 am',
    '5:00 am', '6:00 am', '7:00 am', '8:00 am',
  ];

  // 시간대를 클릭할 때 호출되는 함수
  const handleTimeClick = (time) => {
    // 이미 클릭된 시간대인지 확인
    if (selectedTimes.includes(time)) {
      // 이미 클릭된 시간대면 선택 해제
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      // 선택되지 않은 시간대면 선택
      // 최대 2개까지 선택할 수 있도록 제한
      if (selectedTimes.length < 2) {
        setSelectedTimes([...selectedTimes, time]);
      }
    }
  };

  // 스타일 객체를 정의합니다.
  const buttonStyle = {
    width: '4.3125rem',
    height: '1.875rem',
    flexShrink: 0,
    borderRadius: '50px',
    background: 'linear-gradient(180deg, #0AF 0%, #78D2FF 100%)',
    margin: '1.25rem 1.25rem 0rem 1.25rem',
    border: 'none',
    color:'white'
  };

  const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* 버튼이 넘치면 줄 바꿈 */
`;

const Text = styled.div`
    color: #000;
    font-family: Nunito;
    font-size: .875rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-left:1.25rem;
    `

  const selectedButtonStyle = {
    background: '#0089FF',
  };

  return (
    <div className="time-container">
        <Text>예약 가능 시간 </Text>
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
    </div>
  );
}

export default Btime;