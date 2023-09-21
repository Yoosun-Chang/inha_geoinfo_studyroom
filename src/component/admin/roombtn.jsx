import React, { useState } from "react";
import BList from "./blist.jsx";
import CList from "./clist.jsx";
import { useNavigate } from "react-router-dom";

function CRoomBtn() {
  const schoolNumber = localStorage.getItem("schoolnumber");
  // Button state management
  const [isBClicked, setIsBClicked] = useState(false);
  const [isCClicked, setIsCClicked] = useState(false);
  const [Room, setRoom] = useState("");
  const navigate = useNavigate();
  // Click handler for B룸 버튼
  const handleBClick = async () => {
    setRoom("B");
    setIsBClicked(true);
    setIsCClicked(false);
    // 라우팅이 완료될 때까지 대기한 후에 화면을 업데이트합니다.
    console.log(Room);
    localStorage.setItem("adminRoom", "B");
    // await navigate(`/reservation/${schoolNumber}/B`);
  };

  // Click handler for C룸 버튼
  const handleCClick = async () => {
    setRoom("C");
    setIsCClicked(true);
    setIsBClicked(false);
    localStorage.setItem("adminRoom", "C");
    console.log(Room);
    // 라우팅이 완료될 때까지 대기한 후에 화면을 업데이트합니다.
    // await navigate(`/reservation/${schoolNumber}/C`);
  };

  // Button styles
  const buttonStyle = {
    width: "8.6875rem",
    height: "2.8125rem",
    flexShrink: 0,
    borderRadius: "50px",
    background: "linear-gradient(180deg, #0AF 0%, #78D2FF 100%)",
    cursor: "pointer",
    border: "none",
    color: "white",
    fontSize: "16px",
    margin: "1rem",
    display: "inline-block",
  };

  // 색상을 선택된 버튼에 따라 조절
  const bButtonStyle = isBClicked
    ? { ...buttonStyle, background: "#0089FF" }
    : buttonStyle;
  const cButtonStyle = isCClicked
    ? { ...buttonStyle, background: "#0089FF" }
    : buttonStyle;

  return (
    <div>
      <button style={bButtonStyle} onClick={handleBClick}>
        B룸
      </button>
      <button style={cButtonStyle} onClick={handleCClick}>
        C룸
      </button>

      {/* B룸 버튼을 클릭했을 때 btime 컴포넌트를 표시 */}
      {isBClicked && <BList />}
      {isCClicked && <CList />}
    </div>
  );
}

export default CRoomBtn;
