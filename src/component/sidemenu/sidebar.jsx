import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
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
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  useEffect(() => {
    const schoolNumber = localStorage.getItem("schoolnumber");
    if (schoolNumber) {
      axios
        .get(`https://geostudyroom2.store/myreservation/${schoolNumber}/`)
        .then((response) => {
          if (response.status === 204) {
            console.log("예약목록 없음"); 
            return; 
          }
  
          const userDataFromResponse = response.data[0].user;
          if (userDataFromResponse) {
            const { schoolnumber, name } = userDataFromResponse;
            setUserData({ schoolnumber, name });
          } else {
            console.error("API 응답에 'user' 속성이 없습니다.");
          }
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
  const handleLogout = () => {
    axios
      .get(`https://geostudyroom2.store/logout/`)
      .then((response) => {
        if (response.status === 200) {
          console.log("사용자가 성공적으로 로그아웃되었습니다.");
          localStorage.clear();
          setUserData({ schoolnumber: "", name: "" });
          alert("로그아웃 되었습니다.");
        } else {
          console.error(response.status);
        }
        navigate(`/main`);
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`https://geostudyroom2.store/userlist/`, {
        headers: {
          accept: "application/json",
          "X-CSRFToken": "sf1hfhsyjC3CHnwTBLxQabolXApdCNWImnaVRIqdAb7y7X96KpPKJJcneBAlczGZ",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const schoolNumber = localStorage.getItem("schoolnumber");
          const adminUser = response.data.find((user) => user.schoolnumber === schoolNumber);

          if (adminUser && adminUser.is_staff) {
            setIsAdmin(true);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const schoolNumber = localStorage.getItem("schoolnumber");
  const Name = localStorage.getItem("Name");
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
          {schoolNumber} {Name}
        </Menu1>
        <Menu2 to={`/myreservation/${schoolNumber}`}>예약확인</Menu2>
        <Menu3 onClick={handleLogout} to={`/Main`}>
          {" "}
          로그아웃
        </Menu3>
        {isAdmin ? (
          <Menu4 to="/admin">관리자 페이지</Menu4>
        ) : (
          <Menu4
            onClick={() => alert("관리자가 아닙니다.")} // Display alert for non-admin users
            style={{ cursor: "pointer" }}
          >
            관리자 페이지
          </Menu4>
        )}
      </ul>
    </SideBarWrap>
  );
}

export default Sidebar;