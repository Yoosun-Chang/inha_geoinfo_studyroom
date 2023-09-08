import React, { useState } from 'react';
import styled from 'styled-components';
import ConfirmButton from './confirmbtn';

function Btime() {
  const [selectedTimes, setSelectedTimes] = useState([]);

  // 시간대 목록 수정해야함
  const timeSlots = [
    '9:00 am', '9:30 am', '10:00 am', 
    '10:30 am', '11:00 am', '11:30 am', 
    '12:00 pm', '12:30 pm', '1:00 pm', 
    '1:30 pm', '2:00 pm', '2:30 pm', '3:00 pm', 
    '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm', 
    '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', 
    '7:30 pm', '8:00 pm', '8:30 pm', '9:00 pm', 
    '9:30 pm', '10:00 pm', '10:30 pm', '11:00 pm', 
    '11:30 pm', '12:00 am', '12:30 am', '1:00 am', 
    '1:30 am', '2:00 am', '2:30 am', '3:00 am', 
    '3:30 am', '4:00 am', '4:30 am', '5:00 am', 
    '5:30 am', '6:00 am', '6:30 am', '7:00 am', 
    '7:30 am', '8:00 am', '8:30 am',
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
      if (selectedTimes.length < 4) {
        setSelectedTimes([...selectedTimes, time]);
      }
    }
  };

  const buttonStyle = {
    width: '5.3125rem',
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
  flex-wrap: wrap;
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
      <ConfirmButton/>
    </div>
  );
}

export default Btime;
