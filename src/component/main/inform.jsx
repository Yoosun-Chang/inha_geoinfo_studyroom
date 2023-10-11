import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoImage from "./SchoolLogo.png";
import "./input.css";
import Wave from "../Wave.jsx";
import Top from "../top.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoImage = styled.img`
  width: 6.25rem;
  height: 7.5158rem;
  flex-shrink: 0;
`;

const Text = styled.div`
  color: #0089ff;
  font-family: "Nunito", sans-serif;
  font-size: 1.875rem; 
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.075rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  margin-top: 8rem;
  //height: 100vh;
  justify-content: space-evenly;
`;
const Div = styled.div`
  margin-top: 15%;
`;

const ID = styled.input`
  margin-top: 5%;
  background-color: rgba(0, 176, 255, 1);
  width: 70%;
  margin-left: 15%;
  border: none;
  height: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  padding-left: 5%;
`;
const Help = styled.div`
  color: #00b0ff;
  font-size: smaller;
  margin-left: 65vw;
  padding-top: 5%;
  font-weight: bold;
  padding-bottom: 7.3%;
`;

const Button = styled.button`
  position: absolute;
  width: 30%;
  height: 3rem;
  background: #0089ff;
  border-radius: 40px;
  color: white;
  border: none;
  margin-top: 7%;
  margin-left: 35%;
  z-index: 2;
`;

const WaveContainer = styled.div`
  position: relative;
  margin-top: 15vh; /* 로그인 버튼과의 간격을 늘림 */
`;

function Inform() {
  // CSRF 토큰 가져오기
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  const Swal = require("sweetalert2");
  const handleClick = () => {
    Swal.fire({
      title: "<데이터 미등록> <br/> 문의바랍니다.",
      text: "설윤환 010-5335-1393",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
    });
  };
  const [id, setid] = useState("");
  const [Name, setName] = useState("");

  const HandleId = (e) => {
    setid(e.target.value);
    console.log(e.target.value);
  };

  const HandleName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    // localStorage에서 schoolnumber와 Name 가져오기
    const schoolNumber = localStorage.getItem("schoolnumber");
    const name = localStorage.getItem("Name");
  
    // schoolnumber와 Name이 모두 있는 경우 페이지 이동
    if (schoolNumber && name) {
      navigate(`/reservation/${schoolNumber}`);
    }
  }, []);

  
  useEffect(() => {
    // 페이지가 로드된 후
    // CSRF 토큰 가져오기
    const csrfCookie = document.cookie || "";
    const csrfToken = csrfCookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    if (csrfToken) {
      // Axios 설정에 CSRF 토큰 추가
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    }
  }, []); 

  const navigate = useNavigate(); 

  const HandleUser = () => {
    axios
      .post(`https://geostudyroom.store/login/`, {
        schoolnumber: id,
        password: Name,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response);
        console.log(response.data.token);

        if (response.status === 200) {
          // 로그인이 성공하면 reservation 페이지로 이동하기
          localStorage.setItem("schoolnumber", response.data.schoolnumber);
          localStorage.setItem("Name", response.data.name);
          navigate(`/reservation/${id}`);
        }
      })
      .catch((error) => {
        console.error("Axios 오류:", error);
        Swal.fire({
          title: "로그인 불가",
          text: "로그인에 실패했습니다. 학번과 이름을 다시 확인해주세요.",
          icon: "error",
        });
      });
  };

  return (
    <>
      <Top />
      <Container>
        <LogoImage src={logoImage} alt="School Logo" />
        <Text>
          공간정보공학과
          <br /> 스터디룸 예약
        </Text>
      </Container>
      <Div>
        <ID
          placeholder="학번을 입력하세요."
          value={id}
          onChange={HandleId}
        ></ID>
        <ID
          placeholder="이름을 입력하세요."
          value={Name}
          onChange={HandleName}
        ></ID>
        <Help onClick={handleClick}>로그인 불가</Help>
      </Div>
      <Button onClick={HandleUser}>로그인</Button>
      <WaveContainer></WaveContainer>
      <Wave></Wave>
    </>
  );
}

export default Inform;
