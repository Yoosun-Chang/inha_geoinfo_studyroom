import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios"; 

const SideBarWrap = styled.div`
  z-index: 15;
  border-radius: 15px 0 0 15px;
  background: linear-gradient(180deg, #fff 0%, #78d2ff 100%);
  height: 100%;
  width: 50%;
  right: -50%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;

  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;

const Menu1 = styled.div`
  margin: 40px 10px;
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.6px;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Menu2 = styled(Link)`
  margin: 40px 10px;
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.6px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Menu3 = styled(Link)`
  margin: 40px 10px;
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.6px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const Menu4 = styled(Link)`
  margin: 40px 10px;
  color: #000;
  font-family: Nunito;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.6px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();
  const [userData, setUserData] = useState({ schoolnumber: "", name: "" });

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  useEffect(() => {
    const schoolNumber = localStorage.getItem("schoolnumber");
    if (schoolNumber) {
      // 예약 데이터를 가져오는 Axios 요청
      axios
        .get(`https://geostudyroom.store/myreservation/${schoolNumber}`)
        .then((response) => {
          const { schoolnumber, name } = response.data[0].user;
          setUserData({ schoolnumber, name });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleOutside = (e) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  const schoolNumber = localStorage.getItem("schoolnumber");
  return (
    <SideBarWrap id="sidebar" ref={outside} className={isOpen ? "open" : ""}>
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          fontSize: "24px",
          cursor: "pointer",
          color: "#0089FF",
        }}
        onClick={toggleSide}
      ></div>
      <ul>
        <Menu1>
          {userData.schoolnumber} {userData.name}
        </Menu1>
        <Menu2 to={`/myreservation/${schoolNumber}`}>예약확인</Menu2>
        <Menu3>로그아웃</Menu3>
        <Menu4 to="/admin">관리자 페이지</Menu4>
      </ul>
    </SideBarWrap>
  );
}

export default Sidebar;
