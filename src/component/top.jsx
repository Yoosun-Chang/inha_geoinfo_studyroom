import React from "react";
import styled from "styled-components";
import TopImage from "./Top.jpg"; // 이미지 파일 경로를 적절히 수정하세요

// 반응형 이미지 스타일 컴포넌트
const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: relative; /* 부모 컨테이너를 기준으로 자식 요소를 배치하기 위해 relative 설정 */
  height: 10vh;
  max-height: 50px;
  width: 100vw;
  z-index: -10;
`;

const Text = styled.div`
  font-family: "Nunito", sans-serif;
  font-size: 4vw;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.05rem;
  position: absolute;
  color: #fff;
  left: 10px; /* 텍스트를 이미지의 왼쪽에 위치시킵니다. */
`;

function Top() {
  return (
    <CenteredContainer>
      <ResponsiveImage src={TopImage} alt="Top Image" />
      <Text>INHA UNIVERSITY</Text>
    </CenteredContainer>
  );
}

export default Top;
