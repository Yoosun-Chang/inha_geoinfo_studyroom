import React, { useEffect } from "react";
import Calendar from "../component/admin/calendar";
import Roombtn from "../component/admin/roombtn";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  margin: 30px;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #0089ff;
  cursor: pointer;
  color: white;
  font-size: 16px;
  font-weight: bold;
  user-select: none;
  transition: background-color 0.2s ease-in-out;
  text-align: center;
  line-height: 50px;
  border: none;
`;

function Admin() {
  const schoolNumber = localStorage.getItem("schoolnumber");
  const navigate = useNavigate();
  const goToMain = () => {
    navigate(`/reservation/${schoolNumber}`);
  };

  // 페이지 로딩 시 로컬 스토리지에서 schoolNumber와 name 확인
  useEffect(() => {
    const schoolNumber = localStorage.getItem("schoolnumber");
    const name = localStorage.getItem("Name");

    // schoolNumber와 name이 없을 때 /main 페이지로 이동
    if (!schoolNumber || !name) {
      navigate("/main");
    }
  }, [navigate]);

  return (
    <div>
      <Calendar />
      <Container>
        <Roombtn />
      </Container>
      <CenteredContainer>
        <Button onClick={goToMain}>메인으로</Button>
      </CenteredContainer>
    </div>
  );
}

export default Admin;
