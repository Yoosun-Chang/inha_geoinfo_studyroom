import React from 'react';
import styled from 'styled-components';
import logoImage from './SchoolLogo.png'; // 이미지 파일 경로를 적절히 수정하세요

// 로고 이미지 스타일 컴포넌트
const LogoImage = styled.img`
  width: 6.25rem;
  height: 7.5158rem;
  flex-shrink: 0;
  margin-left:1.5rem;
`;

// 텍스트 스타일 컴포넌트
const Text = styled.div`
  color: #0089FF;
  font-family: 'Nunito', sans-serif;
  font-size: 1.875rem; /* 30px을 rem 단위로 변경 (1rem = 16px 기준) */
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-left:1rem;
  letter-spacing: 0.075rem; /* 1.2px를 rem 단위로 변경 */
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* 가로 중앙 정렬을 위해 추가 */
  margin-top: 8rem;
  //height: 100vh; /* 화면 높이의 100%를 차지하여 세로 중앙 정렬 */
`;

function Infrom() {
  return (
    <Container>
      <LogoImage src={logoImage} alt="School Logo" />
      <Text>
        공간정보공학과 스터디룸 예약
      </Text>
    </Container>
  );
}

export default Infrom;
