import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logoImage from "./SchoolLogo.png"; // 이미지 파일 경로를 적절히 수정하세요
import "./input.css";
import Swal from "sweetalert2/src/sweetalert2.js";
import Wave from "../Wave.jsx";
import Top from "../top.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// 로고 이미지 스타일 컴포넌트
const LogoImage = styled.img`
  width: 6.25rem;
  height: 7.5158rem;
  flex-shrink: 0;
`;

// 텍스트 스타일 컴포넌트
const Text = styled.div`
  color: #0089ff;
  font-family: "Nunito", sans-serif;
  font-size: 1.875rem; /* 30px을 rem 단위로 변경 (1rem = 16px 기준) */
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  letter-spacing: 0.075rem; /* 1.2px를 rem 단위로 변경 */
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 가로 중앙 정렬을 위해 추가 */
  margin-top: 8rem;
  //height: 100vh; /* 화면 높이의 100%를 차지하여 세로 중앙 정렬 */
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
  /* Rectangle 85 */
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
`;

const WaveContainer = styled.div`
  position: relative;
  margin-top: 15vh; /* 로그인 버튼과의 간격을 늘림 */
`;

function Inform() {
  // CSRF 토큰 가져오기 (Django가 제공하는 쿠키에서 추출)
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.withCredentials = true;
  const Swal = require("sweetalert2");
  const handleClick = () => {
    Swal.fire({
      title: "<데이터 미등록> <br/> 문의바랍니다.",
      text: "설윤환 010-5335-1393",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "확인",
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
    // 페이지가 로드된 후에 실행될 코드
    // CSRF 토큰 가져오기 (Django가 제공하는 쿠키에서 추출)
    const csrfCookie = document.cookie || "";
    const csrfToken = csrfCookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];

    if (csrfToken) {
      // Axios 설정에 CSRF 토큰 추가
      axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
    }
  }, []); // 빈 배열을 전달하여 페이지가 처음 로드될 때만 실행

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수 가져오기

  const HandleUser = () => {
    axios
      .post(`https://geostudyroom.store/login/`, {
        schoolnumber: id,
        password: Name,
      })
      .then((response) => {
        console.log(response.data); // 서버 응답을 콘솔에 출력
        console.log(response);
        console.log(response.data.token);

        if (response.status === 200) {
          // 로그인이 성공하면 reservation 페이지로 이동
          localStorage.setItem("schoolnumber", response.data.schoolnumber);
          localStorage.setItem("Name", response.data.name);
          navigate(`/reservation/${id}`);
        }
      })
      .catch((error) => {
        console.error("Axios 오류:", error);
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
