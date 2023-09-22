import React, { useEffect } from "react";
import Calendar from "../component/admin/calendar";
import Roombtn from "../component/admin/roombtn";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  text-align: center;
`;

function Admin() {
  const navigate = useNavigate();

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
    </div>
  );
}

export default Admin;
