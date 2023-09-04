import React, { useState } from 'react';
import Btime from './btime.jsx'; // Btime 컴포넌트를 불러옵니다.

function CRoomBtn() {
  // Button state management
  const [isBClicked, setIsBClicked] = useState(false);
  const [isCClicked, setIsCClicked] = useState(false);

  // Click handler for B룸 버튼
  const handleBClick = () => {
    setIsBClicked(true);
    setIsCClicked(false);
  };

  // Click handler for C룸 버튼
  const handleCClick = () => {
    setIsCClicked(true);
    setIsBClicked(false);
  };

  // Button styles
  const buttonStyle = {
    width: '139px',
    height: '45px',
    flexShrink: 0,
    borderRadius: '50px',
    background: 'linear-gradient(180deg, #0AF 0%, #78D2FF 100%)',
    cursor: 'pointer',
    border: 'none',
    color: 'white',
    fontSize: '16px',
    margin: '2rem'
  };

  // 색상을 선택된 버튼에 따라 조절
  const bButtonStyle = isBClicked ? { ...buttonStyle, background: '#0089FF' } : buttonStyle;
  const cButtonStyle = isCClicked ? { ...buttonStyle, background: '#0089FF' } : buttonStyle;

  return (
    <div>
      <button style={bButtonStyle} onClick={handleBClick}>
        B룸
      </button>
      <button style={cButtonStyle} onClick={handleCClick}>
        C룸
      </button>

      {/* B룸 버튼을 클릭했을 때 btime 컴포넌트를 표시 */}
      {isBClicked && <Btime />}
    </div>
  );
}

export default CRoomBtn;
