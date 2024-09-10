import React, { useEffect } from "react";
import Top2 from "../component/top2";
import List from "../component/myreservation/list";
import Wave from "../component/Wave";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const WaveContainer = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end; 
  align-items: flex-end; 
  position: relative; 
`;

function Myreservation() {
  const navigate = useNavigate();

  // 페이지 로딩 시 로컬 스토리지에서 schoolNumber와 name 확인
  useEffect(() => {
    const schoolNumber = localStorage.getItem("schoolnumber");
    const name = localStorage.getItem("Name");

    // schoolNumber와 name이 없을 때 /main 페이지로 이동
    if (!schoolNumber || !name) {
      navigate("main");
    }
  }, [navigate]);

  return (
    <Container>
      <Top2 />
      <List />
      <WaveContainer>
        <Wave />
      </WaveContainer>
    </Container>
  );
}

export default Myreservation;
