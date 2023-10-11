import React, { useState } from "react";
import BList from "./blist.jsx";
import CList from "./clist.jsx";
import { useNavigate } from "react-router-dom";

function CRoomBtn() {
  const [isBClicked, setIsBClicked] = useState(false);
  const [isCClicked, setIsCClicked] = useState(false);
  const [Room, setRoom] = useState("");
  //const navigate = useNavigate();

  const handleBClick = async () => {
    setRoom("B");
    setIsBClicked(true);
    setIsCClicked(false);
    console.log(Room);
    localStorage.setItem("adminRoom", "B");
    // await navigate(`/reservation/${schoolNumber}/B`);
  };

  const handleCClick = async () => {
    setRoom("C");
    setIsCClicked(true);
    setIsBClicked(false);
    localStorage.setItem("adminRoom", "C");
    console.log(Room);
    // await navigate(`/reservation/${schoolNumber}/C`);
  };

  const buttonStyle = {
    width: "8.6875rem",
    height: "2.8125rem",
    flexShrink: 0,
    borderRadius: "50px",
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.25) 100%)",
    cursor: "pointer",
    border: "none",
    color: "white",
    fontSize: "16px",
    margin: "1rem",
    display: "inline-block",
  };

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

      {isBClicked && <BList />}
      {isCClicked && <CList />}
    </div>
  );
}

export default CRoomBtn;
